
import { useState, useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import semver from 'semver';
import RNFS from 'react-native-fs';
// import FileProvider from 'react-native-file-provider';
import FileViewer from 'react-native-file-viewer';

// The public URL to your manifest file on Supabase(get the project url from supabase)
const MANIFEST_URL = 'https://nmrvqljaropmkxkzbkra.supabase.co/storage/v1/object/public/app-releases/latest.json';

// Define the structure of your latest.json file
interface VersionInfo {
  version: string;
  url: string;
  releaseNotes: string;
  isMandatory: boolean;
}

export const useUpdateChecker = () => {
  const [isUpdateAvailable, setUpdateAvailable] = useState(false);
  const [latestVersionInfo, setLatestVersionInfo] = useState<VersionInfo | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const checkForUpdates = async () => {
    if (isChecking) return;
    setIsChecking(true);
    console.log('Checking for updates...');

    try {
      // 1. Fetch the manifest file
      const response = await fetch(MANIFEST_URL, {
        headers: { 'Cache-Control': 'no-cache' } // Ensure we always get the latest version
      });
      const data: VersionInfo = await response.json();

      // 2. Get the app's current version
      const currentVersion = DeviceInfo.getVersion();
      console.log(`Current version: ${currentVersion}, Latest version: ${data.version}`);

      // 3. Compare versions using semver
      if (semver.gt(data.version, currentVersion)) {
        console.log('Update available!');
        setLatestVersionInfo(data);
        setUpdateAvailable(true);
      } else {
        console.log('App is up to date.');
        setUpdateAvailable(false);
      }
    } catch (error) {
      console.error('Update check failed:', error);
      Alert.alert('Update Check Failed', 'Could not check for updates. Please try again later.');
    } finally {
      setIsChecking(false);
    }
  };

  //note: update feature is only possible for android devices when you are sideloading your app
  const startUpdate = async () => {
    if (!latestVersionInfo || Platform.OS !== 'android') return;

    setIsDownloading(true);
    setDownloadProgress(0);

    // Use a version-specific name to avoid cache issues
    const downloadPath = `${RNFS.CachesDirectoryPath}/ChurchApp-v${latestVersionInfo.version}.apk`;

    try {
      const download = RNFS.downloadFile({
        fromUrl: latestVersionInfo.url,
        toFile: downloadPath,
        progress: (res) => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          setDownloadProgress(Math.round(progress));
        },
        begin: () => {
          console.log('Download started...');
        },
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        console.log('Download complete. Opening installer...');
        setIsDownloading(false);

        // ---- THIS IS THE CRITICAL CHANGE ----
        // Use FileViewer to open the downloaded APK. It handles the FileProvider logic for you.
        await FileViewer.open(downloadPath, { showOpenWithDialog: true });

      } else {
        // This handles cases where the GitHub URL might be broken (e.g., 404 error)
        throw new Error(`Download failed: Server responded with status code ${result.statusCode}`);
      }
    } catch (error) {
      console.error('Update process failed:', error);
      console.error('FileViewer specific error:', JSON.stringify(error, null, 2)); //debug line
      
      setIsDownloading(false);
      // Provide a more accurate error message
      Alert.alert('Installation Failed', `Could not open the installer. Please check app permissions. Error: ${error.message}`);
    }
  };


  // Return all the state and functions so our UI can use them
  return {
    isUpdateAvailable,
    isChecking,
    isDownloading,
    downloadProgress,
    latestVersionInfo,
    checkForUpdates,
    startUpdate,
  };
};