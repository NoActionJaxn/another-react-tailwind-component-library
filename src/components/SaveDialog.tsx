import Dialog, { type DialogProps } from "./Dialog";
import Button from "./Button";

export interface SaveDialogProps extends Omit<DialogProps, "footer"> {
  saveText?: string;
  onSave?: () => void;
  saveDisabled?: boolean;
}

function SaveDialog({
  saveText = "Save changes",
  onSave,
  onOpenChange,
  saveDisabled,
  ...rest
}: SaveDialogProps) {
  const handleSave = () => {
    onSave?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog
      onOpenChange={onOpenChange}
      footer={
        <Button variant="success" onClick={handleSave} disabled={saveDisabled}>
          {saveText}
        </Button>
      }
      {...rest}
    />
  );
}

SaveDialog.displayName = "SaveDialog";

export default SaveDialog;
