import { LoadingSpinner } from "./loadingSpinner";

export const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-[var(--background)] bg-opacity-50 flex items-center justify-center z-50">
        <div className="p-6 flex flex-col items-center">
            <LoadingSpinner width={56} height={56} className="text-[var(--highlight)]" />
            <p className="text-lg font-medium">Entrando...</p>
            <p className="text-sm text-gray-800">Por favor, aguarde um momento</p>
        </div>
    </div>
);
