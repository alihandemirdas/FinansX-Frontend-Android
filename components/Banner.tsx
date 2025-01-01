import React, { useRef } from "react";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  BannerAdProps,
} from "react-native-google-mobile-ads";
import { View } from "react-native";

// Ad Unit ID (Test ID veya gerçek ID)
const adUnitId: string = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-9923127969454459/2142204377";

const Banner: React.FC = () => {
  const bannerRef = useRef<BannerAd>(null);

  return (
    <View>
      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          networkExtras: {
            collapsible: "top",
          },
        }}
        onAdFailedToLoad={(error) =>
          console.error("Ad failed to load:", error.message)
        }
        onAdLoaded={() => console.log("Ad loaded successfully")}
      />
    </View>
  );
};

export default Banner;
