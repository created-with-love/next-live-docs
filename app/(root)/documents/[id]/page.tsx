import CollaborativeRoom from '@/components/CollaborativeRoom';
import React from 'react';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Document = async () => {
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom />
    </main>
  );
};

export default Document;
