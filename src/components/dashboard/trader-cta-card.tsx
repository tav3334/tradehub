import { Users, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TraderCtaCard({
  traderName,
  productName,
}: {
  traderName: string;
  productName: string;
}) {
  const firstName = traderName.split(" ")[0];

  return (
    <Card className="relative overflow-hidden p-8 text-center sm:p-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
      <div className="relative">
        <h3 className="text-[19px] font-semibold tracking-tight text-foreground sm:text-[21px]">
          Want to learn more about {productName}?
        </h3>
        <p className="mx-auto mt-2 max-w-md text-[13.5px] text-muted">
          Get updates on trade activity, monthly recaps and performance milestones.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="w-full gap-2 sm:w-auto">
            <Users className="h-4 w-4" />
            Join {productName}
          </Button>
          <Button variant="secondary" size="lg" className="w-full gap-2 sm:w-auto">
            <Mail className="h-4 w-4" />
            Contact {firstName}
          </Button>
        </div>
      </div>
    </Card>
  );
}
