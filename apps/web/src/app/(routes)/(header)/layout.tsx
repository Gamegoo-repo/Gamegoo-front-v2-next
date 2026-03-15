import { ChatWidget } from "../../../widgets/chat";
import { Header } from "../../../widgets/header";
import { InitAuthProvider } from "../../providers/InitAuthProvider";
import { SocketProvider } from "../../providers/SocketProvider";

export default async function ContentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <InitAuthProvider>
      <SocketProvider>
        <div className="mx-auto my-20 max-w-[1220px]">
          <Header />
          <main>{children}</main>
        </div>

        <div className="fixed right-8 bottom-8 z-40">
          <ChatWidget />
        </div>
      </SocketProvider>
    </InitAuthProvider>
  );
}
