"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

interface ProjectData {
  name: string;
  key: string;
  description: string;
}

// Create a new project
export async function createProject(data: ProjectData) {
  const { userId, orgId } = auth();

  if (!userId) {
    throw new Error("Unauthorized: No user ID found.");
  }

  if (!orgId) {
    throw new Error("No Organization Selected.");
  }

  // Check if the user is an admin of the organization
  

  const membershipListResponse = await clerkClient.organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  const userMembership = membershipListResponse.data.find(
    (membership) => membership.publicUserData?.userId === userId
  );

  console.log("mm", userMembership)

  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organization admins can create projects.");
  }

  try {
    const project = await db.project.create({
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
        organizationId: orgId,
      },
    });

    return project;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error("Error creating project: " + err.message);
  }
}

// Fetch a project with associated sprints
// export async function getProject(projectId: string) {
//   const { userId, orgId } = auth();

//   if (!userId || !orgId) {
//     throw new Error("Unauthorized: User or organization ID is missing.");
//   }

//   // Verify user existence
//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) {
//     throw new Error("User not found.");
//   }

//   // Fetch project details including sprints
//   const project = await db.project.findUnique({
//     where: { id: projectId },
//     include: {
//       sprints: {
//         orderBy: { createdAt: "desc" },
//       },
//     },
//   });

//   if (!project) {
//     throw new Error("Project not found.");
//   }

//   // Check if the project belongs to the organization
//   if (project.organizationId !== orgId) {
//     throw new Error("Unauthorized: You do not have access to this project.");
//   }

//   return project;
// }

// // Delete a project
// export async function deleteProject(projectId: string) {
//   const { userId, orgId, orgRole } = auth();

//   if (!userId || !orgId) {
//     throw new Error("Unauthorized: User or organization ID is missing.");
//   }

//   if (orgRole !== "org:admin") {
//     throw new Error("Only organization admins can delete projects.");
//   }

//   const project = await db.project.findUnique({
//     where: { id: projectId },
//   });

//   if (!project || project.organizationId !== orgId) {
//     throw new Error("Project not found or you do not have permission to delete it.");
//   }

//   await db.project.delete({
//     where: { id: projectId },
//   });

//   return { success: true };
// }
