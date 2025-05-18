import { useCallback, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { socket } from '../sockets';

export type EmitFunction = <T = unknown>(
  event: string,
  payload?: T,
  callback?: () => void
) => void;

export function useSocket() {
  const socketRef = useRef<Socket>(socket);

  const receiveMessageFromServer = useCallback(
    ({ user, message }: { user: string; message: string }) => {
      console.log(user, message);
    },
    []
  );

  const startListeners = useCallback(() => {
    const { current: ref } = socketRef;

    ref.on('receive-message', receiveMessageFromServer);
  }, [receiveMessageFromServer]);

  const stopListeners = useCallback(() => {
    const { current: ref } = socketRef;

    ref.off('receive-message', receiveMessageFromServer);
  }, [receiveMessageFromServer]);

  const socketDispatcher: EmitFunction = useCallback(
    (event, payload, callback) => {
      socket.emit(event, payload, callback);
    },
    []
  );

  useEffect(() => {
    const ref = socketRef.current;

    if (!ref.connected) ref.connect();

    return () => {
      ref.disconnect();
    };
  }, []);

  useEffect(() => {
    startListeners();

    return () => {
      stopListeners();
    };
  }, [startListeners, stopListeners]);

  return { socket: socketRef.current, emit: socketDispatcher };
}
