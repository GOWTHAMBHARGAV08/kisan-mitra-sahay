import React, { useState } from 'react';
import { Camera, Upload, Calculator, Shield, Beaker, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PestRiskGauge from '@/components/PestRiskGauge';

const CropCare = () => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [acreage, setAcreage] = useState('');

  const crops = [
    { id: 'rice', name: 'Rice', icon: '🌾' },
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'cotton', name: 'Cotton', icon: '🌱' },
    { id: 'maize', name: 'Maize', icon: '🌽' },
    { id: 'pulses', name: 'Pulses', icon: '🫘' },
  ];

  const simulateDiagnosis = () => {
    // Simulate diagnosis result
    setDiagnosisResult({
      name: 'Brown Spot Disease',
      confidence: 85,
      severity: 'Medium',
      affectedStage: 'Tillering',
      spreadRisk: 'High',
    });
  };

  const getNPKRecommendation = () => {
    if (!acreage) return null;
    const area = parseFloat(acreage);
    return {
      nitrogen: Math.round(area * 120),
      phosphorus: Math.round(area * 60),
      potassium: Math.round(area * 40),
    };
  };

  const npkRec = getNPKRecommendation();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Crop Care Center</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pest detection, disease management, and fertilizer planning
          </p>
        </div>

        {/* Crop Selection */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h3 className="font-semibold text-sm text-foreground mb-3">Select Your Crop</h3>
          <div className="flex flex-wrap gap-2">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCrop === crop.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <span>{crop.icon}</span>
                <span>{crop.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Disease/Pest Detector */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-card rounded-2xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Disease & Pest Detector</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" className="flex items-center space-x-2">
                        <Camera className="w-4 h-4" />
                        <span>Take Photo</span>
                      </Button>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload Image</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload a clear photo of affected leaves or describe symptoms
                    </p>
                    <Input 
                      placeholder="Describe symptoms: yellowing leaves, brown spots..."
                      className="max-w-md mx-auto"
                    />
                    <Button onClick={simulateDiagnosis} className="mt-4">
                      Analyze Symptoms
                    </Button>
                  </div>
                </div>

                {diagnosisResult && (
                  <div className="bg-gradient-to-r from-accent-soft to-accent/20 border border-accent/30 rounded-xl p-6">
                    <h3 className="font-semibold text-accent-foreground mb-4">Diagnosis Result</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Disease:</span>
                            <span className="font-medium">{diagnosisResult.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Confidence:</span>
                            <span className="font-medium text-success">{diagnosisResult.confidence}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Severity:</span>
                            <span className={`font-medium ${
                              diagnosisResult.severity === 'High' ? 'text-danger' : 'text-warning'
                            }`}>
                              {diagnosisResult.severity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Growth Stage:</span>
                            <span className="font-medium">{diagnosisResult.affectedStage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Spread Risk:</span>
                            <span className="font-medium text-danger">{diagnosisResult.spreadRisk}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Treatment Options */}
            {diagnosisResult && (
              <section className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="text-lg font-semibold text-foreground mb-4">Treatment Options</h2>
                
                <div className="space-y-4">
                  <div className="border border-success/30 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Leaf className="w-5 h-5 text-success" />
                      <h3 className="font-semibold text-success">Organic/Bio Treatment</h3>
                    </div>
                    <p className="text-sm text-foreground mb-2">
                      Apply Neem Oil 3% @ 3 ml/L in early morning; repeat after 7 days if pest persists.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Safe for beneficial insects • Pre-harvest interval: 3 days
                    </p>
                  </div>

                  <div className="border border-warning/30 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Beaker className="w-5 h-5 text-warning" />
                      <h3 className="font-semibold text-warning">Chemical Treatment</h3>
                    </div>
                    <p className="text-sm text-foreground mb-2">
                      Propiconazole 25% EC @ 1ml/L • Brand: Tilt, Bumper, Protec
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pre-harvest interval: 21 days • Use PPE during application
                    </p>
                  </div>

                  <div className="border border-info/30 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Shield className="w-5 h-5 text-info" />
                      <h3 className="font-semibold text-info">Preventive Measures</h3>
                    </div>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Maintain 20x15 cm spacing between plants</li>
                      <li>• Use certified disease-free seeds</li>
                      <li>• Install yellow sticky traps (10/acre)</li>
                      <li>• Practice crop rotation with legumes</li>
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Risk Level */}
            <PestRiskGauge riskLevel={65} pestType="Brown Spot" cropType="Rice" />

            {/* Fertilizer Calculator */}
            <section className="bg-card rounded-2xl p-6 shadow-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                NPK Calculator
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="acreage" className="text-sm font-medium">
                    Acreage (acres)
                  </Label>
                  <Input
                    id="acreage"
                    value={acreage}
                    onChange={(e) => setAcreage(e.target.value)}
                    placeholder="e.g., 2.5"
                    type="number"
                    step="0.1"
                  />
                </div>

                {npkRec && (
                  <div className="space-y-3 pt-2">
                    <h4 className="font-medium text-sm">Recommended Dosage:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Nitrogen (N):</span>
                        <span className="font-medium">{npkRec.nitrogen} kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Phosphorus (P):</span>
                        <span className="font-medium">{npkRec.phosphorus} kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Potassium (K):</span>
                        <span className="font-medium">{npkRec.potassium} kg</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Add to Calendar
                    </Button>
                  </div>
                )}
              </div>
            </section>

            {/* Safety Reminder */}
            <div className="bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/30 rounded-xl p-4">
              <h4 className="font-semibold text-warning text-sm mb-2">Safety Reminder</h4>
              <ul className="text-xs text-warning/80 space-y-1">
                <li>• Always wear PPE during chemical application</li>
                <li>• Apply during early morning (6-8 AM)</li>
                <li>• Maintain 500m buffer from water sources</li>
                <li>• Follow label instructions strictly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCare;