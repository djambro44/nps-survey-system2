"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmbedScriptProps {
  apiKey: string
}

export function EmbedScript({ apiKey }: EmbedScriptProps) {
  const [copied, setCopied] = useState(false)
  const [position, setPosition] = useState("bottom-right")
  const [primaryColor, setPrimaryColor] = useState("#3b82f6")

  const embedCode = `<!-- NPS Survey Widget -->
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://your-domain.com/nps-widget.js';
    script.async = true;
    script.onload = function() {
      NPSWidget.init({
        apiKey: '${apiKey}',
        position: '${position}',
        primaryColor: '${primaryColor}',
        // Optional: customize when to show the survey
        delay: 5000, // Show after 5 seconds
        // Optional: show only once per user
        showOnce: true
      });
    };
    document.head.appendChild(script);
  })();
</script>`

  const reactCode = `import { NPSWidget } from '@your-org/nps-widget'

function App() {
  return (
    <div>
      {/* Your app content */}
      
      <NPSWidget
        apiKey="${apiKey}"
        position="${position}"
        primaryColor="${primaryColor}"
        onSubmit={(score, feedback) => {
          console.log('NPS Response:', { score, feedback })
        }}
      />
    </div>
  )
}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Your NPS Survey</CardTitle>
        <CardDescription>Copy and paste this code into your website to start collecting NPS feedback</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                <SelectItem value="top-right">Top Right</SelectItem>
                <SelectItem value="top-left">Top Left</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#3b82f6"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML/JavaScript</TabsTrigger>
            <TabsTrigger value="react">React Component</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="space-y-2">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{embedCode}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(embedCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="react" className="space-y-2">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{reactCode}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(reactCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
