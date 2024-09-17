import React, { useState } from 'react';
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole } from '@/integrations/supabase/hooks/roles';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const RoleManagement = () => {
  const { data: roles, isLoading } = useRoles();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  const handleCreateRole = async () => {
    if (newRoleName) {
      await createRole.mutateAsync({ name: newRoleName, description: newRoleDescription });
      setNewRoleName('');
      setNewRoleDescription('');
    }
  };

  const handleUpdateRole = async (id, name, description) => {
    await updateRole.mutateAsync({ id, name, description });
  };

  const handleDeleteRole = async (id) => {
    await deleteRole.mutateAsync(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Role Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create New Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Role Name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
            <Input
              placeholder="Role Description"
              value={newRoleDescription}
              onChange={(e) => setNewRoleDescription(e.target.value)}
            />
            <Button onClick={handleCreateRole}>Create Role</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleUpdateRole(role.id, role.name, role.description)} variant="outline" size="sm" className="mr-2">
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteRole(role.id)} variant="destructive" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;