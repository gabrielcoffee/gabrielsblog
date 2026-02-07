import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
    return (
		<>
		<Header />
        <div className="flex flex-col justify-center h-screen px-6 max-w-[600px] mx-auto">

			<h1 className="text-4xl mb-8 font-bold font-hk-grotesk">hi, i'm gabriel</h1>
			<div className="flex flex-col gap-2">
				<p className="text-lg font-hk-grotesk">
					you may have noticed that this website is still under construction.
				</p>
				<p className="text-lg font-hk-grotesk">
					and that the developer is still a beginner.
				</p>
				<p className="text-lg font-hk-grotesk">
					but it's ok, what matters is the <span className="font-bold">art and the heart.</span> 
				</p>
			</div>
		</div>
		</>
    );
}
