import Layout from "./components/Layout";
import { useSession } from "next-auth/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function Home() {
    ChartJS.register(ArcElement, Tooltip, Legend);

    return (
        <Layout>
            <div className="space-y-4">
                <div className="space-y-4">
                    <h1 className="text-5xl">
                        Hola, {useSession().data?.user?.name}
                    </h1>
                    <div className="divider"></div>
                    <h3 className="text-xl self-center">
                        Estas son tus estadísticas
                    </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {Array(4).fill(
                        <div className="p-4 border rounded-box">
                            <Doughnut
                                className="mx-auto"
                                data={{
                                    labels: ["Red", "Blue", "Yellow"],
                                    datasets: [
                                        {
                                            label: "# of Votes",
                                            data: [12, 19, 3],
                                            backgroundColor: [
                                                "rgba(255, 99, 132, 0.2)",
                                                "rgba(54, 162, 235, 0.2)",
                                                "rgba(255, 206, 86, 0.2)",
                                            ],
                                            borderColor: [
                                                "rgba(255, 99, 132, 1)",
                                                "rgba(54, 162, 235, 1)",
                                                "rgba(255, 206, 86, 1)",
                                            ],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
