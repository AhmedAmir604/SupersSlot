import { ButtonDemo } from "@/_components/ButtonComp";
import DidYouKnow from "@/_components/DidYouKnow";
import GuyWithBanner from "@/_components/GuyWithBanner";
//Dont need HomePageGP
import Services from "@/_components/Services";

export default function LandingPage() {
  return (
    <section className="relative  ">
      <GuyWithBanner />
      <Services />
      <DidYouKnow />
    </section>
  );
}
