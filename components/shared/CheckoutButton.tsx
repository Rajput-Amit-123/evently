"use client"
import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';

import Checkout from './Checkout';
import Link from 'next/link';

const CheckoutButton = ({event}:{event:IEvent}) => {
    const hasEventFinshed = new Date(event.endDateTime) < new Date();
    const {user} = useUser();
    const userId = user?.publicMetadata.userId as string;
  return (
    <div>
      {hasEventFinshed ? (
        <div>
          <p>Event is Closed.</p>
        </div>
      ) : (
        <>
          <SignedOut>
            <Button className="button rounded-full" asChild size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
}

export default CheckoutButton