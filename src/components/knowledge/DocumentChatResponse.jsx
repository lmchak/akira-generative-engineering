import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

const DocumentChatResponse = ({ response }) => {
  const [showSourceChunks, setShowSourceChunks] = useState(false);

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="prose dark:prose-invert">
          <p>{response.answer}</p>
        </div>

        <div>
          <Button
            variant="outline"
            onClick={() => setShowSourceChunks(!showSourceChunks)}
            className="w-full justify-between"
          >
            Show source chunks
            {showSourceChunks ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>

          {showSourceChunks && (
            <div className="mt-4 space-y-4">
              {response.sourceChunks.map((chunk, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-2">Page {chunk.page}</p>
                    <p className="text-sm">{chunk.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentChatResponse;