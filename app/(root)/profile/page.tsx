import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.action';
import { auth } from '@clerk/nextjs';
import Link from 'next/link'
import React from 'react'

const Profile =  async () => {
  const { sessionClaims } = auth();

  const userId = await sessionClaims?.userId as string;

  const OrganizedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events" className="">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

      {/* <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle="No Events Tickets Purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore."
          collectionType="My_Tickets"
          limit={6}
          page={1}
          urlParamName='ordersPage'
          totalPages={2}
        />
      </section> */}

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/events/create" className="">
              Create New Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={OrganizedEvents?.data}
          emptyTitle="No Events have been created yet"
          emptyStateSubtext="Create some now."
          collectionType="Event_Organized"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </section>
    </>
  );
}

export default Profile