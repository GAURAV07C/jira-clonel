'use server';

import { db } from "@/lib/prisma";
import { auth, clerkClient, Organization } from "@clerk/nextjs/server";
// import type { Organization } from "@clerk/nextjs/api"; // Import Clerk's Organization type if available

export async function getOrganisation(slug: string): Promise<Organization | null> {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Get the organization details by slug
    const organization = await clerkClient.organizations.getOrganization({ slug });

    if (!organization) {
        return null;
    }

    // Check if user belongs to this organization
    const { data: membership } = await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: organization.id,
    });

    const userMembership = membership.find(
        (member) => member.publicUserData?.userId === userId
    );

    // If user is not a member, return null
    if (!userMembership) {
        return null;
    }

    return organization;
}
