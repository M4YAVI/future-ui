import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 container mx-auto">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="hidden md:block w-64 shrink-0">
                        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto pl-4">
                            <Sidebar />
                        </div>
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 px-4 py-8 md:px-8 md:py-12 lg:px-12">
                        <div className="mx-auto max-w-3xl">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
