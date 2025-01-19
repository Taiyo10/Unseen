import React from 'react';
import styles from './Home.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom'; // For navigation between pages
import { writeFact } from '../../../../Firebase/firebaseUtils'; // Import the writeFact function

function Home() {
  const navigate = useNavigate(); // Initialize navigate function

  const factsAndSources = [
    ["50% of people around the world lack access to essential health care.", "https://www.pih.org/article/6-global-health-facts-may-surprise-you", "www.pih.org"],
    ["Millions have been pushed to the brink of starvation including 2.2 million children under five in Yemen.", "https://www.globalcitizen.org/en/content/facts-about-world-conflicts/", "www.globalcitizen.org"],
    ["The last decade was the hottest in 125,000 years.", "https://earth.org/data_visualization/11-interesting-facts-about-climate-change/", "www.earth.org"],
    ["We are losing 1.2 trillion tons of ice each year.", "https://earth.org/data_visualization/11-interesting-facts-about-climate-change/", "www.earth.org"],
    ["6.7 million people die each year from air pollution-related causes.", "https://www.who.int/news-room/fact-sheets/detail/household-air-pollution-and-health#:~:text=The%20combined%20effects%20of%20ambient,(COPD)%20and%20lung%20cancer.", "www.who.int"],
    ["Estimated 27.6 million people are victims of human trafficking worldwide.", "https://www.state.gov/national-human-trafficking-prevention-month-2023/#:~:text=An%20estimated%2027.6%20million%20are,and%20outreach%20efforts%20are%20essential.", "www.state.gov"],
    ["Over 2 billion people worldwide live in countries experiencing high water stress.", "https://unstats.un.org/sdgs/report/2023/goal-06/#:~:text=An%20estimated%202.4%20billion%20people,key%20to%20reducing%20water%20stress.", "www.unstats.un.org"],
    ["As of 2023, over 713 million people face chronic hunger worldwide.", "https://www.who.int/news/item/24-07-2024-hunger-numbers-stubbornly-high-for-three-consecutive-years-as-global-crises-deepen--un-report#:~:text=Despite%20some%20progress%20in%20specific,undernourished%20in%202023%E2%80%94approximately%20152", "www.who.int"],
    ["Every year, around 11 million tons of plastic waste enters the oceans.", "https://ocean.org/pollution-plastics/plastic-reduction/", "www.ocean.org"],
    ["Over 244 million children and youth are out of school worldwide.", "https://www.unesco.org/gem-report/en/articles/244m-children-wont-start-new-school-year#:~:text=Paris%2C%201%20September%202022%20%E2%80%93%20As,are%20still%20out%20of%20school.", "www.unesco.org"],
    ["Women earn, on average, 77 cents for every dollar earned by men globally.", "https://www.un.org/en/observances/equal-pay-day", "www.un.org"],
    ["About 10 million hectares of forests are lost each year due to deforestation.", "https://ourworldindata.org/deforestation#:~:text=Globally%2C%20we%20deforest%20around%20ten%20million%20hectares%20of%20forest%20every%20year.&text=That's%20an%20area%20the%20size,deforestation%20occurs%20in%20the%20tropics.", "www.ourworldindata.org"],
    ["The world produces over 2 billion tons of solid waste annually, with only 13.5% being recycled.", "https://datatopics.worldbank.org/what-a-waste/trends_in_solid_waste_management.html", "www.worldbank.org"],
    ["Domestic violence affects 1 in 3 women worldwide.", "https://www.who.int/news-room/fact-sheets/detail/violence-against-women", "www.who.int"],
    ["An estimated 22 million people globally are living in forced marriages.", "https://www.iom.int/news/50-million-people-worldwide-modern-slavery", "www.iom.int"],
    ["Tobacco use causes over 8 million deaths annually.", "https://www.who.int/news-room/fact-sheets/detail/tobacco", "www.who.int"],
    ["Gun-related deaths in the U.S. reached over 48,000 in 2021.", "https://www.pewresearch.org/short-reads/2023/04/26/what-the-data-says-about-gun-deaths-in-the-u-s/", "www.pewresearch.org"],
    ["Nearly 9% of the world’s population lives on less than $2.15 a day.", "https://www.worldbank.org/en/publication/poverty-prosperity-and-planet#:~:text=Today%2C%20almost%20700%20million%20people,higher%20than%20before%20the%20pandemic.", "www.worldbank.org"],
    ["Over 700,000 people die by suicide every year.", "https://www.who.int/news-room/fact-sheets/detail/suicide", "www.who.int"],
    ["Coral reefs could disappear by 2050.", "https://www.coralguardian.org/en/coral-reefs-at-risk/#:~:text=Corals%20are%20endangered,reefs%20could%20disappear%20by%202050.", "www.coralguardian.org"],
    ["The richest 1% of the world's population owns over 45% of global wealth.", "https://inequality.org/facts/global-inequality/", "www.inequality.org"],
    ["In 2022, malaria caused over 619,000 deaths.", "https://www.who.int/teams/global-malaria-programme/reports/world-malaria-report-2022", "www.who.int"],
    ["Over 100,000 marine animals die each year from ingesting or becoming entangled in plastic waste.", "https://oceanblueproject.org/wp-content/uploads/2023/02/how-many-animals-die-from-plastic-pollution-ocean-blue-report.pdf", "www.oceanblueproject.org"],
    ["By 2050, an estimated 200 million people could be displaced due to climate change-induced disasters.", "https://www.unrefugees.org/news/how-climate-change-impacts-refugees-and-displaced-communities/", "www.unrefugees.org"],
    ["Global ransomware attacks have increased by 150% in 2023.", "https://securityandtechnology.org/blog/2023-rtf-global-ransomware-incident-map/", "www.securityandtechnology.org"],
    ["As of August 2024, inflation was identified as the most pressing global issue.", "https://www.statista.com/statistics/946266/most-worrying-topics-worldwide/", "www.statista.com"],
    ["The ozone layer is on track to fully recover by 2066 if current policies remain in place.", "https://wmo.int/media/news/wmo-ozone-and-uv-bulletin-published-world-ozone-day#:~:text=If%20current%20policies%20remain%20in,the%20rest%20of%20the%20world.", "www.wmo.int"],
    ["The Arctic is warming four times faster than the global average.", "https://www.nature.com/articles/s43247-022-00498-3", "www.nature.com"],
    ["Solar energy installations increased by 20% in 2023.", "https://www.iea.org/reports/renewables-2023/executive-summary", "www.iea.org"],
    ["1 in 4 people globally face high water stress, threatening food security and livelihoods.", "https://www.wri.org/insights/highest-water-stressed-countries", "www.wri.org"]
  ];
  
  const uploadFactsToDatabase = async () => {
    for (let i = 0; i < factsAndSources.length; i++) {
      const [text, source, sourceShort] = factsAndSources[i];
      const factId = `fact_${i + 1}`; // Generate a unique fact ID
      try {
        await writeFact(factId, text, source, sourceShort);
        console.log(`Successfully uploaded fact with ID: ${factId}`);
      } catch (error) {
        console.error(`Error uploading fact with ID: ${factId}`, error);
      }
    }
  };
  
  //uploadFactsToDatabase();


  return (
    <div className={styles.homeContainer}>
      {/* Background Image and Container */}
      
      {/* Text Section */}
      <div className={styles.textContainer}>
        <h1>UNSEEN</h1>
        <p className={styles.quote}>Discover the Facts That Matter</p>
        <button
          className={styles.startButton}
          onClick={() => navigate('../Game')} // Navigate to the "Game" page
        >
          Start
        </button>
      </div>
      
      {/* Tenor GIF Embed (if needed in the future) */}
    </div>
  );
}

export default Home;