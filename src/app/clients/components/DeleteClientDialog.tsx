import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteClientDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (e: React.MouseEvent) => void;
}

export default function DeleteClientDialog({ open, onClose, onConfirm }: DeleteClientDialogProps) {
    const handleCancelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja deletar?</DialogTitle>
                    <DialogDescription className="text-black">
                        Essa ação não poderá ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="secondary"
                        className="bg-gray-300 text-black hover:bg-gray-400"
                        onClick={handleCancelClick}
                    >
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Deletar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
