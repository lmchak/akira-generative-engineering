import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Search, Trash, FileText } from 'lucide-react';
import { Input } from "@/components/ui/input";

const KnowledgeBaseList = ({ knowledgeBases, onEdit, onDelete, searchQuery, onSearchChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Find knowledge base..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Source Files</TableHead>
            <TableHead>Creation Time</TableHead>
            <TableHead>Last Sync</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {knowledgeBases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="text-gray-500">No knowledge base to display</div>
                <Button variant="outline" className="mt-4">
                  Create knowledge base
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            knowledgeBases.map((kb) => (
              <TableRow key={kb.id}>
                <TableCell>{kb.name}</TableCell>
                <TableCell>{kb.status}</TableCell>
                <TableCell>{kb.description}</TableCell>
                <TableCell>
                  <FileText className="h-4 w-4" />
                  {kb.sourceFiles}
                </TableCell>
                <TableCell>{new Date(kb.creationTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(kb.lastSync).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(kb)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(kb.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default KnowledgeBaseList;