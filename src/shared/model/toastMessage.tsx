import { toast } from "sonner";

type ToastColor = "red" | "violet" | "yellow";

const colorVariants = {
  red: "border-red-600! bg-red-100! text-red-600!",
  violet: "border-violet-600! bg-violet-100! text-violet-600!",
  yellow: "border-yellow-600! bg-yellow-100! text-yellow-600!"
};

const getClassName = (toastColor: ToastColor) => {
  return `py-2! px-6! rounded-xl! border! ${colorVariants[toastColor]}`;
};

function Message({ message }: { message: string }) {
  return <span className="text-sm font-bold">{message}</span>;
}

export const toastMessage = {
  error(message: string) {
    toast.error(<Message message={message} />, {
      position: "top-center",
      className: `${getClassName("red")} shadow-[3px_3px_6px_0_rgba(255,82,82,0.4)]!`,
      cancel: {
        label: "닫기",
        onClick: () => toast.dismiss()
      },
      cancelButtonStyle: {
        backgroundColor: "#f52e2e",
        color: "white"
      }
    });
  },

  success(message: string) {
    toast.success(<Message message={message} />, {
      position: "top-center",
      className: `${getClassName("violet")} shadow-[3px_3px_6px_0_rgba(99,66,238,0.5)]!`,
      cancel: {
        label: "닫기",
        onClick: () => toast.dismiss()
      },
      cancelButtonStyle: {
        backgroundColor: "#5a42ee",
        color: "white"
      }
    });
  },

  warning(message: string) {
    toast.warning(<Message message={message} />, {
      position: "top-center",
      className: `${getClassName("yellow")} shadow-[3px_3px_6px_0_rgba(240, 177, 0, 0.5)]!`,
      cancel: {
        label: "닫기",
        onClick: () => toast.dismiss()
      },
      cancelButtonStyle: {
        backgroundColor: "#d08700",
        color: "white"
      }
    });
  }
};
