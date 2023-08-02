

declare module 'firebase/app' {
    namespace firebase {
      interface FirebaseApp {
        storage: () => firebase.storage.Storage;
      }
    }
  }
  
  declare module 'firebase/storage' {
    namespace firebase {
      interface storage {
        Storage: firebase.storage.Storage;
      }
    }
  }
  