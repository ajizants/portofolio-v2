import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Card } from "@/components/ui/card";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <Card>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </Card>

                    <Card>
                        <UpdatePasswordForm className="max-w-xl" />
                    </Card>

                    <Card className="dark:bg-zinc-600">
                        <DeleteUserForm className="max-w-xl" />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
