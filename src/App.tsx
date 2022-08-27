import { useEffect } from 'react';
import { auth as firebaseAuth } from './repositories/firebase';
function App() {
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(async (user) => {
      console.log(user);
    });
    return () => unsub();
  }, []);
  return <div>hello</div>;
}

export default App;
