
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SummaryData, PeriodType } from '../types';

interface GeminiAnalysisProps {
  summary: SummaryData;
  period: number;
  periodType: PeriodType;
}

const GeminiAnalysis: React.FC<GeminiAnalysisProps> = ({ summary, period, periodType }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAnalysis = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analise os seguintes resultados de uma simulação de juros compostos:
        - Valor Total Investido: R$ ${summary.totalInvested.toFixed(2)}
        - Valor Total em Juros: R$ ${summary.totalInterest.toFixed(2)}
        - Montante Final: R$ ${summary.totalAmount.toFixed(2)}
        - Prazo: ${period} ${periodType === PeriodType.YEARS ? 'anos' : 'meses'}
        - O rendimento sobre o capital investido foi de ${summary.yieldPercentage.toFixed(2)}%

        Forneça uma análise rápida (máximo 3 parágrafos) em português do Brasil destacando:
        1. O poder do tempo neste investimento.
        2. Dicas práticas para maximizar o resultado.
        3. Um incentivo financeiro educacional.
        Use um tom profissional, direto e técnico-motivador. Formate com negrito quando necessário.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setAnalysis(response.text || "Análise indisponível no momento.");
    } catch (error) {
      console.error("Error:", error);
      setAnalysis("Erro ao carregar análise. Verifique sua chave de API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-md p-8 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-5 text-8xl text-primary">
        <i className="fa-solid fa-brain"></i>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary text-white p-2 rounded-lg text-sm">
            <i className="fa-solid fa-sparkles"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Análise Inteligente</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-tight">Processado por Gemini AI</p>
          </div>
        </div>

        {analysis ? (
          <div className="animate-fade-in">
            <div className="bg-white/80 p-5 rounded-lg text-sm leading-relaxed text-slate-700 shadow-inner border border-blue-50">
              {analysis.split('\n').map((para, i) => (
                <p key={i} className={para.trim() ? "mb-4" : ""}>{para}</p>
              ))}
            </div>
            <button 
              onClick={() => setAnalysis(null)}
              className="mt-4 text-[10px] font-bold text-primary hover:text-blue-800 uppercase tracking-widest flex items-center gap-2"
            >
              <i className="fa-solid fa-rotate-right"></i> Nova Análise
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-6">
            <p className="text-sm text-slate-600 mb-6 text-center max-w-md">
              Nossa inteligência artificial pode interpretar seus números e sugerir estratégias personalizadas para o seu patrimônio.
            </p>
            <button 
              onClick={generateAnalysis}
              disabled={loading}
              className={`px-8 py-3 rounded-md font-bold text-sm transition-all flex items-center gap-3 ${
                loading 
                  ? 'bg-blue-200 text-blue-500 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-blue-800 shadow-md hover:shadow-lg active:scale-95'
              }`}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Processando dados...
                </>
              ) : (
                <>
                  Obter Insights Financeiros <i className="fa-solid fa-bolt-lightning"></i>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiAnalysis;
