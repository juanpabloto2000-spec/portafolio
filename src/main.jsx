import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LeadProvider } from './context/LeadContext';
import { CMSProvider } from './context/CMSContext';
import './styles/index.css';

// Registro de WebMCP para compatibilidad nativa con agentes en navegadores (W3C WebML / Chrome WebMCP standard)
if (typeof navigator !== 'undefined' && navigator.modelContext?.provideContext) {
  try {
    navigator.modelContext.provideContext({
      tools: [
        {
          name: 'diagnose_business_bottleneck',
          description: 'Diagnostica cuellos de botella D0 en negocios de hotelería, gastronomía y clínicas estéticas.',
          inputSchema: {
            type: 'object',
            properties: {
              industry: { type: 'string', description: 'Giro o industria del negocio' },
              frictionPoint: { type: 'string', description: 'Problema principal: sobreventa, WhatsApp manual, descuadre de caja' }
            },
            required: ['industry']
          },
          execute: async (args) => {
            return {
              status: 'success',
              recommendation: `Para la industria ${args.industry}, Dynamind Studios implementa un Core Operativo con calendario atómico y arqueo ciego.`
            };
          }
        },
        {
          name: 'calculate_operational_roi',
          description: 'Calcula horas ahorradas y retorno de inversión al automatizar con agentes autónomos.',
          inputSchema: {
            type: 'object',
            properties: {
              weeklyHours: { type: 'number', description: 'Horas semanales dedicadas a tareas manuales' },
              staffCostPerHour: { type: 'number', description: 'Costo por hora del personal' }
            },
            required: ['weeklyHours', 'staffCostPerHour']
          },
          execute: async (args) => {
            const annualSavings = (args.weeklyHours || 20) * (args.staffCostPerHour || 10) * 52 * 0.75;
            return {
              annualSavingsUSD: annualSavings,
              freedHoursAnnual: (args.weeklyHours || 20) * 52 * 0.75
            };
          }
        }
      ]
    });
  } catch (err) {
    console.debug('WebMCP context registration notice:', err);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CMSProvider>
      <LeadProvider>
        <App />
      </LeadProvider>
    </CMSProvider>
  </React.StrictMode>
);
