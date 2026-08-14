import { Task } from "@/src/types/task";
import { ReactNode } from "react";

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  task,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task: Task;
  onClose: () => void;
}) {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-(--surface) p-6 rounded-2xl shadow-xl max-w-lg w-full border border-(--surface-four)">
          {children}
        </div>
      </div>
    )
  );
}
