import { Nav } from "..";
import { LoginButton } from "../../../features/auth";
import { GamegooLogo } from "../../../shared/ui/logo";

export async function Header() {
  return (
    <header className="flex justify-between">
      <div className="flex gap-8">
        <GamegooLogo
          className="w-32"
          asLink
        />
        <Nav />
      </div>

      <LoginButton />
    </header>
  );
}
