// components/DeleteClientDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteClientDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteClientDialog({ open, onClose, onConfirm }: DeleteClientDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja deletar?</DialogTitle>
                    <DialogDescription>
                        Essa ação não poderá ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>
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
