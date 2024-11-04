
import { getOrganisation } from '@/actions/organisation';
import OrgSwitcher from '@/components/organisation/OrgSwitcher';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

// Define the parameters structure expected
interface Params {
    orgId: string; // Ensure this matches your dynamic route parameter
}

// Define the props type for your Organisation component
interface OrganisationProps {
    params: Promise<Params>; // Ensure that this is a Promise that resolves to an object
}

const Organisation = async ({ params }: OrganisationProps) => {
    // Await the params promise to resolve and extract orgId
    const { orgId } = await params; 
    console.log('Resolved Params:', orgId);

    // Await the auth call to ensure you get the userId
    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in");
        return null; // Return null after redirecting
    }

    const organization = await getOrganisation(orgId);
    if (!organization) {
        return <div>Organization not found</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
                <h1 className="text-5xl font-bold gradient-title pb-2">
                    {organization.name}&rsquo;s Projects
                </h1>
                <OrgSwitcher />
            </div>
        </div>
    );
};

export default Organisation;
