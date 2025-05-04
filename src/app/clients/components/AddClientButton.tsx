import { Plus } from "lucide-react";

export default function  AddClientButton({ onClick }: { onClick: () => void }) {
    return (
        <div className="fixed right-4 bottom-5">
            <button onClick={onClick} className="w-14 h-14 rounded-full bg-gradient-to-r from-[#0065FF] to-[#0057DB] flex items-center justify-center shadow-lg hover:from-[#004FC7] hover:to-[#005AE6] transition-colors transform hover:scale-110 transition-transform duration-200">
                <Plus className="h-7 w-7 text-white" />
            </button>
        </div>
    )
}