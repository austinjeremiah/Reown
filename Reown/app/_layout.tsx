import "@walletconnect/react-native-compat";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { Chain } from "viem";

// Reown AppKit + Wagmi
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, arbitrum, sepolia } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
} from "@reown/appkit-wagmi-react-native";

const queryClient = new QueryClient();

const projectId = "7a6e6a1f7934519391a590f1b17504df";

const metadata = {
  name: "Reown Wallet Demo",
  description: "Minimal Connect Button Example",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "Reown://", 
    universal: "yourapp.com",
  },
};

// Define custom chains first
export const rarichain: Chain = {
  id: 1918988905,
  name: "RARI Chain Testnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rari-testnet.calderachain.xyz/http"] },
    public: { http: ["https://rari-testnet.calderachain.xyz/http"] },
  },
  blockExplorers: {
    default: { name: "Rari Explorer", url: "https://rari-testnet.hub.caldera.xyz/" },
  },
  testnet: true,
};

export const appChain: Chain = {
  id: 4661,
  name: "AppChain Testnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://appchaintestnet.rpc.caldera.xyz/http"] },
    public: { http: ["https://appchaintestnet.rpc.caldera.xyz/http"] },
  },
  blockExplorers: {
    default: { name: "AppChain Explorer", url: "https://appchaintestnet.hub.caldera.xyz/" },
  },
  testnet: true,
};

const chains = [mainnet, polygon, arbitrum, sepolia, rarichain, appChain] as const;
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createAppKit({
  projectId,
  metadata,
  wagmiConfig,
  defaultChain: mainnet,
  enableAnalytics: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}