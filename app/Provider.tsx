'use client';
import React, { ReactNode } from 'react';
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import Loader from '@/components/Loader';
import { getClerkUsers } from '@/lib/actions/user.action';

const Provider = ({ children }: { children: ReactNode }) => {
  const resolveUsers = async ({ userIds }: { userIds: string[] }) => {
    const users = await getClerkUsers({ userIds });

    return users;
  };

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={resolveUsers}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
