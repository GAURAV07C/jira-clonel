import { getOrganisation } from '@/actions/organisation';
import OrgSwitcher from '@/components/organisation/OrgSwitcher';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

interface OrganisationProps {
    params: {
        orgId: string;
    };
}

const Organisation: React.FC<OrganisationProps> = async ({ params }) => {
    const { orgId } = params;
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
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
