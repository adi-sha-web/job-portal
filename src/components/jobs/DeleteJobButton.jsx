"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DeleteJobButton({ jobId, title }) {

    const router = useRouter();

    async function handleDelete() {

        try {

            const res = await fetch(`/api/jobs/${jobId}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!data.success) {

                toast.error(data.message || "Failed to delete job");

                return;

            }

            toast.success("Job deleted successfully");

            router.refresh();

        } catch (error) {

            toast.error("Something went wrong");

        }

    }

    return (

        <AlertDialog>

            <AlertDialogTrigger asChild>

                <Button
                    variant="destructive"
                    size="sm"
                >
                    <Trash2 className="mr-2 h-4 w-4" />

                    Delete

                </Button>

            </AlertDialogTrigger>

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>

                        Delete Job

                    </AlertDialogTitle>

                    <AlertDialogDescription>

                        Are you sure you want to delete

                        <strong> {title}</strong>?

                        This action cannot be undone.

                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>

                        Cancel

                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                    >
                        Delete
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );

}