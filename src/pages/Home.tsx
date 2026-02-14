import Header from "@/components/Header/Header"
import Metrics from "@/components/Metrics/Metrics"
import ChartHead from "@/components/Chart/ChartHead"
import Chart from "@/components/Chart/Chart"
import ChannelsHead from "@/components/Channels/ChannelsHead"
import Channels from "@/components/Channels/Channels"

const Home = () => {
  return (
    <>
      <Header/>
      <Metrics/>
      <ChartHead/>
      <Chart/>
      <ChannelsHead/>
      <Channels/>
    </>
  )
}

export default Home
