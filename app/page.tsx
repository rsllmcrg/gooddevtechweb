import { Container } from "@/components/Container";
import { siteConfig } from "@/content/site";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center font-sans">
      <Container className="gap-md py-3xl flex flex-col items-center text-center">
        <h1>{siteConfig.name}</h1>
        <p className="text-grey-700 max-w-md">{siteConfig.description}</p>
      </Container>
    </div>
  );
}
