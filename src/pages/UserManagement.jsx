import React from 'react';
import { useSupabaseAuth } from '@/integrations/supabase';
import { useUserRoles, useAssignRole, useRemoveRole } from '@/integrations/supabase/hooks/roles';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from '@/integrations/supabase/hooks/profiles';

const UserManagement = () => {
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);
  const { data: userRoles, isLoading } = useUserRoles(session?.user?.id);
  const assignRole = useAssignRole();
  const removeRole = useRemoveRole();

  const handleAssignRole = (roleName) => {
    assignRole.mutate({ userId: session.user.id, roleName });
  };

  const handleRemoveRole = (roleName) => {
    removeRole.mutate({ userId: session.user.id, roleName });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Current Roles</h2>
              {userRoles && userRoles.length > 0 ? (
                <ul className="list-disc list-inside">
                  {userRoles.map((role, index) => (
                    <li key={index}>{role.role_name}</li>
                  ))}
                </ul>
              ) : (
                <p>No roles assigned</p>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Manage Roles</h2>
              <div className="flex space-x-2 mt-2">
                <Button onClick={() => handleAssignRole('admin')} variant="outline">
                  Assign Admin
                </Button>
                <Button onClick={() => handleAssignRole('engineer')} variant="outline">
                  Assign Engineer
                </Button>
                <Button onClick={() => handleAssignRole('project_manager')} variant="outline">
                  Assign Project Manager
                </Button>
                <Button onClick={() => handleAssignRole('user')} variant="outline">
                  Assign User
                </Button>
              </div>
              <div className="flex space-x-2 mt-2">
                <Button onClick={() => handleRemoveRole('admin')} variant="outline">
                  Remove Admin
                </Button>
                <Button onClick={() => handleRemoveRole('engineer')} variant="outline">
                  Remove Engineer
                </Button>
                <Button onClick={() => handleRemoveRole('project_manager')} variant="outline">
                  Remove Project Manager
                </Button>
                <Button onClick={() => handleRemoveRole('user')} variant="outline">
                  Remove User
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;