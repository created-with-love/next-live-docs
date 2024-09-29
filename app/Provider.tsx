'use client';
import React, { ReactNode } from 'react';
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import Loader from '@/components/Loader';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.action';
import { useUser } from '@clerk/nextjs';

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  const resolveUsers = async ({ userIds }: { userIds: string[] }) => {
    const users = await getClerkUsers({ userIds });

    return users;
  };

  const resolveMentionSuggestions = async ({
    text,
    roomId,
  }: {
    text: string;
    roomId: string;
  }) => {
    const roomUsers = await getDocumentUsers({
      roomId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      currentUser: clerkUser?.emailAddresses[0].emailAddress!,
      text,
    });

    return roomUsers;
  };

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
