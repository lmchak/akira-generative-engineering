'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChevronDown, Share2, User, Settings, Send, Image as ImageIcon, Paperclip, File, Folder, Upload, X, Check, Copy, Download, FileSpreadsheet } from "lucide-react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls, Box, Plane, Environment, SoftShadows, Text, Html } from "@react-three/drei"
import * as THREE from 'three'
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from 'react-markdown'

function ExpandableSection({ title, children, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="mb-3">
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <ChevronDown className={`h-4 w-4 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-3 border-t">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Scene({ activeTab, selectedRack, setSelectedRack, onGenerateClick }) {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)
  const racksRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (directionalLightRef.current) {
      directionalLightRef.current.shadow.mapSize.width = 2048
      directionalLightRef.current.shadow.mapSize.height = 2048
      directionalLightRef.current.shadow.camera.far = 50
      directionalLightRef.current.shadow.bias = -0.001
    }
  }, [])

  useEffect(() => {
    if (racksRef.current && activeTab !== 'define') {
      const box = new THREE.Box3().setFromObject(racksRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera.fov * (Math.PI / 180)
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))

      cameraZ *= 1.5 // Zoom out a bit so objects don't fill the screen

      const initialCameraPosition = new THREE.Vector3(center.x, center.y, center.z + cameraZ)
      camera.position.copy(initialCameraPosition)
      camera.lookAt(center)

      // Animate to the calculated position
      const animateCamera = () => {
        const currentPosition = camera.position.clone()
        const targetPosition = initialCameraPosition.clone()
        const vector = targetPosition.sub(currentPosition)
        const distance = vector.length()

        if (distance > 0.1) {
          camera.position.lerp(initialCameraPosition, 0.05)
          camera.lookAt(center)
          requestAnimationFrame(animateCamera)
        }
      }

      animateCamera()
    }
  }, [camera, activeTab])

  const handleGenerate = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onGenerateClick()
    }, 3000)
  }

  return (
    <>
      <color attach="background" args={['#e6f3ff']} />
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={0.8}
        castShadow
      />
      {activeTab !== 'define' && (
        <group ref={racksRef}>
          <DataCenterRacks count={267} rowCount={26} selectedRack={selectedRack} setSelectedRack={setSelectedRack} />
        </group>
      )}
      <DataCenterFloor />
      <Environment preset="sunset" background={false} />
      <SoftShadows size={10} samples={16} focus={0.5} />
      {activeTab === 'define' && (
        <>
          <Text
            position={[0, 2, 0]}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
          >
            Generate a Design
          </Text>
          <Html position={[0, 1, 0]}>
            <Button
              onClick={handleGenerate}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Generate
            </Button>
          </Html>
          {isLoading && (
            <Html position={[0, 0, 0]}>
              <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </Html>
          )}
        </>
      )}
    </>
  )
}

function ServerRack({ position, id, isSelected, onClick }) {
  const rackRef = useRef<THREE.Mesh>(null)

  return (
    <group position={position} onClick={onClick}>
      <Box args={[0.8, 2, 0.6]} ref={rackRef} castShadow receiveShadow>
        <meshPhysicalMaterial color={isSelected ? "#FFA500" : "#ffffff"} metalness={0.6} roughness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
      </Box>
      <Box args={[0.79, 1.98, 0.01]} position={[0, 0, 0.305]} castShadow>
        <meshPhysicalMaterial color="#f0f0f0" metalness={0.5} roughness={0.3} clearcoat={0.5} clearcoatRoughness={0.1} />
      </Box>
      {[...Array(8)].map((_, i) => (
        <Box key={i} args={[0.05, 0.05, 0.01]} position={[-0.3 + (i % 4) * 0.2, 0.8 - Math.floor(i / 4) * 0.2, 0.31]}>
          <meshStandardMaterial color="#0066ff" emissive="#0066ff" emissiveIntensity={0.5} />
        </Box>
      ))}
    </group>
  )
}

function DataCenterRacks({ count = 267, rowCount = 26, selectedRack, setSelectedRack }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ServerRack
          key={index}
          id={index}
          position={[
            (index % rowCount) * 1.2 - (rowCount * 1.2) / 2,
            1,
            Math.floor(index / rowCount) * 1.2 - (Math.floor(count / rowCount) * 1.2) / 2
          ]}
          isSelected={selectedRack === index}
          onClick={() => setSelectedRack(index)}
        />
      ))}
    </>
  )
}


function DataCenterFloor() {
  return (
    <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <meshStandardMaterial color="#ffffff" />
    </Plane>
  )
}

function InfoPanel({ rackId }) {
  return (
    <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
      <h3 className="font-semibold mb-2 text-sm">Rack Info</h3>
      <p className="text-sm">ID: {rackId}</p>
      <p className="text-sm">Power Usage: 4500W</p>
      <p className="text-sm">Temperature: 24°C</p>
    </div>
  )
}


function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="p-6 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </motion.div>
  )
}

function PromptInterface({ onSendClick }) {
  const [responses, setResponses] = useState<string[]>([])
  const [prompt, setPrompt] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const responsesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (responsesContainerRef.current) {
      responsesContainerRef.current.scrollTop = responsesContainerRef.current.scrollHeight
    }
  }, [responses])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      setResponses(prev => [...prev, `User: ${prompt}`, `AI: Processing...`])
      setPrompt('')
      onSendClick() // Trigger the loading overlay
      // Simulate AI response after 3 seconds
      setTimeout(() => {
        setResponses(prev => [...prev.slice(0, -1), `AI: Echo of "${prompt}"`])
        onSendClick() // Hide the loading overlay
      }, 3000)
    }
  }

  const handleFileUpload = (type: 'image' | 'file') => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log(`File selected: ${file.name}`)
      // Here you would typically handle the file upload
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-900 font-sans">
      <div ref={responsesContainerRef} className="flex-grow p-3 overflow-y-auto">
        <div className="space-y-3">
          {responses.map((response, index) => (
            <div key={index} className="bg-white p-2 rounded-lg shadow-sm text-sm">
              {response}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200 sticky bottom-0">
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Request a change..."
              className="pr-16 py-1 text-sm rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handleFileUpload('image')}
                className="h-6 w-6 hover:bg-gray-100 transition-colors duration-200"
              >
                <ImageIcon className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Upload image</span>
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handleFileUpload('file')}
                className="h-6 w-6 hover:bg-gray-100 transition-colors duration-200"
              >
                <Paperclip className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Attach file</span>
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {prompt.trim() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Button type="submit" size="icon" className="h-8 w-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send prompt</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
    </div>
  )
}

function AIAgents() {
  return (
    <div className="space-y-3">
      <div className="p-3 bg-gray-100 rounded-lg">
        <h4 className="font-semibold mb-1 text-sm">Agent 1: Data Center Optimizer</h4>
        <p className="text-xs">Specializes in optimizing data center layouts and resource allocation.</p>
      </div>
      <div className="p-3 bg-gray-100 rounded-lg">
        <h4 className="font-semibold mb-1 text-sm">Agent 2: Energy Efficiency Analyst</h4>
        <p className="text-xs">Focuses on improving energy efficiency and reducing carbon footprint.</p>
      </div>
      <div className="p-3 bg-gray-100 rounded-lg">
        <h4 className="font-semibold mb-1 text-sm">Agent 3: Security Compliance Manager</h4>
        <p className="text-xs">Ensures data center designs meet security and compliance standards.</p>
      </div>
    </div>
  )
}

function KnowledgeBase() {
  const [files, setFiles] = useState([
    { name: 'Data Center Layout', type: 'folder', children: [
      { name: 'Floor Plan', type: 'file' },
      { name: 'Rack Arrangement', type: 'file' },
    ]},
    { name: 'Cooling Systems', type: 'folder', children: [
      { name: 'HVAC Specifications', type: 'file' },
      { name: 'Liquid Cooling', type: 'file' },
    ]},
    { name: 'Power Distribution', type: 'file' },
    { name: 'Network Topology', type: 'file' },
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const renderFileTree = (items, depth = 0) => {
    return (
      <ul className={`pl-${depth * 3}`}>
        {items.map((item, index) => (
          <li key={index} className="py-1 text-sm">
            <div className="flex items-center">
              {item.type === 'folder' ? <Folder className="w-3 h-3 mr-1" /> : <File className="w-3 h-3 mr-1" />}
              <span>{item.name}</span>
            </div>
            {item.children && renderFileTree(item.children, depth + 1)}
          </li>
        ))}
      </ul>
    )
  }

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFiles(prevFiles => [...prevFiles, { name: file.name, type: 'file' }])
      console.log(`File uploaded: ${file.name}`)
    }
  }

  return (
    <>
      {renderFileTree(files)}
      <div className="mt-3">
        <Button
          onClick={handleUpload}
          variant="outline"
          className="w-full flex items-center justify-center text-xs py-1"
        >
          <Upload className="w-3 h-3 mr-1" />
          Upload Document
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
      </div>
    </>
  )
}

function ShareModal({ isOpen, onClose, projectState }) {
  const [shareLink, setShareLink] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      generateShareLink()
    }
  }, [isOpen, projectState])

  const generateShareLink = () => {
    try {
      const encodedState = btoa(JSON.stringify(projectState))
      const link = `https://datacenter-designer.com/share/${encodedState}`
      setShareLink(link)
      setError('')
    } catch (err) {
      setError('Failed to generate share link. Please try again.')
    }
  }

  const handleCopyLink = () => {
    if (inputRef.current) {
      inputRef.current.select()
      document.execCommand('copy')
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Share Project</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mb-3">
          <Label htmlFor="share-link" className="text-sm">Project Link</Label>
          <div className="flex mt-1">
            <Input
              id="share-link"
              ref={inputRef}
              value={shareLink}
              readOnly
              className="flex-grow text-sm"
            />
            <Button
              onClick={handleCopyLink}
              className="ml-2 flex items-center text-xs py-1"
              aria-label="Copy link"
            >
              {isCopied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
              {isCopied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <p className="text-xs text-gray-500">
          Anyone with this link will be able to view your project.
        </p>
      </div>
    </div>
  )
}

export default function Component() {
  const [activeTab, setActiveTab] = useState('define')
  const [criteria, setCriteria] = useState({
    totalRacks: '',
    rackInletTemperature: '',
    racksPerRow: '',
    airSideDelta: '',
    totalITLoad: '',
    chilledWaterTemperature: '',
    loadPerRack: '',
    liquidCoolToAirCooledRatio: ''
  })
  const [selectedRack, setSelectedRack] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value })
  }

  const handleTabChange = (value: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(value)
      setIsTransitioning(false)
    }, 300)
  }

  const handleSendClick = () => {
    setIsLoading(prev => !prev)
  }

  const handleShareClick = () => {
    setIsShareModalOpen(true)
  }

  const closeShareModal = () => {
    setIsShareModalOpen(false)
  }

  const handleExportDesign = () => {
    console.log('Exporting design...')
  }

  const handleDownloadBoQ = () => {
    console.log('Downloading Bill of Quantities...')
  }

  const handleGenerate = () => {
    console.log('Generating...')
    handleTabChange('create')
  }

  const projectState = {
    activeTab,
    criteria,
    selectedRack,
  }

  const designOverviewText = `
## Data Center Design Overview

To create a detailed design and simplified layout diagram for a 267-rack data hall using liquid cooling, we will incorporate the specified design considerations and parameters. Below is a conceptual overview of the design elements, followed by a simplified representation of the layout diagram.

### System Overview

The data center will utilize a chilled water system feeding CRAHs or fan walls while integrating liquid-cooled IT equipment (ITE). The design will focus on efficient routing of water piping, placement of CDUs, and effective management of the cooling loop (TCS).

### Design Elements

#### 1. Water Piping Design

- **Overhead Water Piping:** The overhead piping will be dimensioned to accommodate the flow requirements for the cooling system.
- **Valve Placements:** Install isolation valves at strategic locations for maintenance and control.
- **Tap-off Connections:** Design tap-off connections to the Facility Water System (FWS) for easy integration with existing infrastructure.

#### 2. Coolant Distribution Unit (CDU) Design

- **Location:** Position CDUs centrally to minimize piping lengths to the racks. Consider placing them in rows between the racks or at the end of the rows.
- **Space and Maintenance:** Ensure adequate space around CDUs for maintenance access.
- **Redundancy:** Implement redundant CDUs to ensure continuous operation during maintenance.

#### 3. Cooling Loop (TCS) Design

- **Routing:** Plan the routing of the TCS loop to minimize bends and maximize efficiency.
- **Recirculating Pump Considerations:** Select pumps based on the total head loss and flow requirements of the system.
- **Materials Selection:** Use corrosion-resistant materials suitable for the chosen fluid, ensuring temperature stability.

#### 4. Pipe Planning

- **Path and Connections:** Design the path of the piping to connect to liquid-cooled ITE, ensuring minimal obstruction and ease of access.
- **Layout and Material Selection:** Choose materials that can withstand the operating temperatures and pressures of the system.

### Design Parameters

- **Total Racks:** 267
- **Racks per Row:** 26
- **Total IT Load:** 8 MW
- **Rack Load:** 30 kW per rack
- **Rack Inlet Temperature:** 24 ± 2 °C
- **Air Side Delta T:** 10 °C
- **Chilled Water Temperature:** 20/30 °C for FWU
- **Rack Cooling Mix:** 70% liquid-cooled servers, 30% air-cooled servers
`

  return (
    <div className="flex flex-col h-screen bg-gray-100" style={{ fontFamily: 'Archivo, sans-serif' }}>
      <div className="w-full h-10 bg-gray-200 flex items-center justify-between px-3">
        <div className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Akira%20Icon-7cokXbzRL4gmCYgYjHGclV4vW5xPW6.png"
            alt="Akira Logo"
            width={20}
            height={20}
            className="mr-2"
          />
        </div>
        <div className="flex space-x-3 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleShareClick}
                  className="p-1 rounded-full hover:bg-gray-300 transition-colors duration-200"
                  aria-label="Share project"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <User className="h-4 w-4" />
          <Settings className="h-4 w-4" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open export menu</span>
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportDesign}>
                <Download className="mr-2 h-4 w-4" />
                <span>Export Design</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadBoQ}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                <span>Download Bill of Quantities</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[30%] bg-white flex flex-col">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full p-3">
            <TabsList className="w-full">
              <TabsTrigger value="define" className="flex-1 text-sm">Define</TabsTrigger>
              <TabsTrigger value="create" className="flex-1 text-sm">Create</TabsTrigger>
              <TabsTrigger value="orchestrate" className="flex-1 text-sm">Orchestrate</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === 'define' && (
              <div className="p-3 flex-1 overflow-y-auto">
                <div className="space-y-3">
                  <ExpandableSection title="Criteria" defaultExpanded={true}>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="totalRacks" className="text-xs">Total Racks</Label>
                        <Input id="totalRacks" name="totalRacks" value={criteria.totalRacks} onChange={handleInputChange} placeholder="" className="text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="rackInletTemperature" className="text-xs">Rack Inlet Temperature</Label>
                        <Input id="rackInletTemperature" name="rackInletTemperature" value={criteria.rackInletTemperature} onChange={handleInputChange} placeholder="°C" className="text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="racksPerRow" className="text-xs">Racks per Row</Label>
                        <Input id="racksPerRow" name="racksPerRow" value={criteria.racksPerRow} onChange={handleInputChange} placeholder="" className="text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="airSideDelta" className="text-xs">Air Side Delta</Label>
                        <Input id="airSideDelta" name="airSideDelta" value={criteria.airSideDelta} onChange={handleInputChange} placeholder="°C" className="text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="totalITLoad" className="text-xs">Total IT Load</Label>
                        <Input id="totalITLoad" name="totalITLoad" value={criteria.totalITLoad} onChange={handleInputChange} placeholder="MW" className="text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="chilledWaterTemperature" className="text-xs">Chilled Water Temperature</Label>
                        <Input id="chilledWaterTemperature" name="chilledWaterTemperature" value={criteria.chilledWaterTemperature} onChange={handleInputChange} placeholder="°C" className="text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="loadPerRack" className="text-xs">Load per Rack</Label>
                        <Input id="loadPerRack" name="loadPerRack" value={criteria.loadPerRack} onChange={handleInputChange} placeholder="kW" className="text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="liquidCoolToAirCooledRatio" className="text-xs">Liquid Cool to Air Cooled Ratio</Label>
                        <Input 
                          id="liquidCoolToAirCooledRatio" 
                          name="liquidCoolToAirCooledRatio" 
                          value={criteria.liquidCoolToAirCooledRatio} 
                          onChange={handleInputChange} 
                          placeholder="%" 
                          className="text-sm" 
                        />
                      </div>
                    </div>
                  </ExpandableSection>
                </div>
              </div>
            )}
            {activeTab === 'create' && (
              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-hidden">
                  <div className="h-full flex flex-col">
                    <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                      <div className="p-3">
                        <ReactMarkdown className="prose prose-sm max-w-none">
                          {designOverviewText}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 mt-auto border-t border-gray-200">
                  <PromptInterface onSendClick={handleSendClick} />
                </div>
              </div>
            )}
            {activeTab === 'orchestrate' && (
              <div className="p-3 flex-1 space-y-3 overflow-y-auto">
                <ExpandableSection title="AI Agents" defaultExpanded={true}>
                  <AIAgents />
                </ExpandableSection>
                <ExpandableSection title="Knowledge Base" defaultExpanded={true}>
                  <KnowledgeBase />
                </ExpandableSection>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 bg-gray-200 relative">
          <div className={`absolute inset-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {activeTab === 'orchestrate' ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-xl font-semibold text-gray-500">Orchestrate View Placeholder</p>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }} className="w-full h-full">
                  <Scene activeTab={activeTab} selectedRack={selectedRack} setSelectedRack={setSelectedRack} onGenerateClick={handleGenerate} />
                  <OrbitControls makeDefault target={[0, 1, 0]} />
                </Canvas>
                <div className="absolute top-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded text-sm font-semibold">
                  Isolated View
                </div>
              </div>
            )}
            {selectedRack !== null && activeTab !== 'define' && <InfoPanel rackId={selectedRack} />}
            <AnimatePresence>
              {isLoading && <LoadingOverlay />}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} projectState={projectState} />
    </div>
  )
}
