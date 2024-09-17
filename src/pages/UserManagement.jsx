import React, { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/integrations/supabase';
import { useUserRoles, useAssignRole, useRemoveRole } from '@/integrations/supabase/hooks/roles';
import { useProfiles } from '@/integrations/supabase/hooks/profiles';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserManagement = () => {
  const { session } = useSupabaseAuth();
  const { data: profiles, isLoading: profilesLoading } = useProfiles();
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: userRoles, isLoading: rolesLoading } = useUserRoles(selectedUser);
  const assignRole = useAssignRole();
  const removeRole = useRemoveRole();

  const handleAssignRole = async (roleName) => {
    if (selectedUser) {
      await assignRole.mutateAsync({ userId: selectedUser, roleName });
    }
  };

  const handleRemoveRole = async (roleName) => {
    if (selectedUser) {
      await removeRole.mutateAsync({ userId: selectedUser, roleName });
    }
  };

  if (profilesLoading || rolesLoading) {
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
          <Select onValueChange={(value) => setSelectedUser(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {profiles.map((profile) => (
                <SelectItem key={profile.id} value={profile.id}>
                  {profile.first_name} {profile.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedUser && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Current Roles</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userRoles.map((role) => (
                    <TableRow key={role.role_name}>
                      <TableCell>{role.role_name}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleRemoveRole(role.role_name)} variant="destructive" size="sm">
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <h2 className="text-xl font-semibold mt-4 mb-2">Assign Role</h2>
              <div className="flex space-x-2">
                <Button onClick={() => handleAssignRole('admin')} variant="outline">Assign Admin</Button>
                <Button onClick={() => handleAssignRole('engineer')} variant="outline">Assign Engineer</Button>
                <Button onClick={() => handleAssignRole('project_manager')} variant="outline">Assign Project Manager</Button>
                <Button onClick={() => handleAssignRole('user')} variant="outline">Assign User</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
