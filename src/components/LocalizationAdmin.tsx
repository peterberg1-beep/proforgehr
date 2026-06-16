import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const SUPPORTED_CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "ZAR", name: "South African Rand" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
];

const SUPPORTED_LOCALES = [
  { code: "en-US", name: "English (US)" },
  { code: "en-ZA", name: "English (South Africa)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "af-ZA", name: "Afrikaans" },
  { code: "zu-ZA", name: "Zulu" },
  { code: "es-ES", name: "Spanish" },
  { code: "fr-FR", name: "French" },
  { code: "de-DE", name: "German" },
  { code: "ja-JP", name: "Japanese" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
];

const SUPPORTED_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Hong_Kong",
  "Australia/Sydney",
  "Africa/Johannesburg",
  "Africa/Cairo",
  "Africa/Lagos",
];

export function LocalizationAdmin() {
  const { data: localization } = trpc.localization.get.useQuery();
  const updateLocalization = trpc.localization.update.useMutation({
    onSuccess: () => {
      toast.success("Localization settings updated");
    },
    onError: (error) => {
      toast.error(`Failed to update localization: ${error.message}`);
    },
  });

  const [currency, setCurrency] = useState("ZAR");
  const [locale, setLocale] = useState("en-ZA");
  const [timezone, setTimezone] = useState("Africa/Johannesburg");

  useEffect(() => {
    if (localization) {
      setCurrency(localization.currency);
      setLocale(localization.locale);
      setTimezone(localization.timezone);
    }
  }, [localization]);

  const handleSave = () => {
    updateLocalization.mutate({
      currency,
      locale,
      timezone,
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Localization Settings</CardTitle>
        <CardDescription>
          Configure currency, language, and timezone for your organization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Currency Selection */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_CURRENCIES.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.name} ({curr.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Locale Selection */}
          <div className="space-y-2">
            <Label htmlFor="locale">Language & Region</Label>
            <Select value={locale} onValueChange={setLocale}>
              <SelectTrigger id="locale">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LOCALES.map((loc) => (
                  <SelectItem key={loc.code} value={loc.code}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timezone Selection */}
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_TIMEZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <p className="text-sm font-semibold">Preview</p>
          <p className="text-sm">
            Currency: <span className="font-mono">{currency}</span>
          </p>
          <p className="text-sm">
            Language: <span className="font-mono">{locale}</span>
          </p>
          <p className="text-sm">
            Timezone: <span className="font-mono">{timezone}</span>
          </p>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={updateLocalization.isPending}
          className="w-full"
        >
          {updateLocalization.isPending ? "Saving..." : "Save Localization Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}
