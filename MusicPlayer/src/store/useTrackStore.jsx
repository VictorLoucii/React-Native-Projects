import { create } from "zustand";

export const useTrackStore = create((set) => ({
    currentTrack: {
        title: "Chaff and Dust",
        artist: "Alan Walker",
        artwork: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/861/325x325/live-your-life-1741654856-2nQueoDu5k.png",
    },
    setCurrentTrack: (track) => set({currentTrack: track})
}))


//above code but using return statement with {}, note that return {} works in Zustand and return () doesn't works in Zustand
// import { create } from 'zustand';

// export const useTrackStore = create((set) => {
//   return {
//     currentTrack: {
//       title: 'Chaff and Dust',
//       artist: 'Alan Walker',
//       artwork:
//         'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/861/325x325/live-your-life-1741654856-2nQueoDu5k.png',
//     },
//     setCurrentTrack: (track) => set({ currentTrack: track }),
//   };
// });
