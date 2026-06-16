import { Panel } from "@/components/Panel";
import { Sidebar } from "@/components/Sidebar";

export default function NutritionRoute() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Panel title="FUEL_LOGISTICS">
          <div className="text-lg leading-relaxed space-y-4">
            <p>
              <b className="text-[#39ff14]">DAILY TARGET:</b> ~Aprox Calories =
              Body Weight x 12 // ~Aprox Protein = Body Weight * .7 - 1.0 //
              ~Aprox water intake 100oz //
            </p>
            <hr className="border-[#333]" />
            <p>
              <b className="text-[#39ff14]">EXAMPLE DAY</b>
            </p>
            <p>
              <b className="text-[#39ff14]">0700: BREAKFAST</b>
              <br />- Smoothie (30g Protein + 1/2 cup Oats + Banana + 30g Peanut
              Butter + 170g plain nonfat greek yogurt + 1/2 cup milk + 8oz water)
            </p>
            <p>
              <b className="text-[#39ff14]">SNACK STACK (THROUGHOUT DAY)</b>
              <br />- 1x Mozzarella Stick | 1x Beef Chomps Stick | 1x Apple | 1x
              Greek Yogurt
            </p>
            <p>
              <b className="text-[#39ff14]">1200: LUNCH</b>
              <br />- 4oz Meat + Veg + 1 Cup Rice/Pasta
            </p>
            <p>
              <b className="text-[#39ff14]">1800: DINNER</b>
              <br />- 4oz Meat + Veg + 1 Cup Rice/Pasta
            </p>
          </div>
        </Panel>
      </main>
    </div>
  );
}
