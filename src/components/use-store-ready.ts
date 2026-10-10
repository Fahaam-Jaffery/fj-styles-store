import { useBoutique } from "@/stores/boutique";
import { useEffect, useState } from "react";

export function useStoreReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = useBoutique.persist.onFinishHydration(() => setReady(true));
    void useBoutique.persist.rehydrate();
    return unsub;
  }, []);

  return ready;
}
