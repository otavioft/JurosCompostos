
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
        Use um tom profissional e motivador. Formate com negrito quando necessário.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setAnalysis(response.text || "Não foi possível gerar a análise.");
    } catch (error) {
      console.error("Error generating insight:", error);
      setAnalysis("Ocorreu um erro ao carregar o insight da IA. Por favor, verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl text-indigo-700">
        <i className="fa-solid fa-robot"></i>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles text-indigo-500"></i>
          Insight da IA
        </h3>
        <p className="text-sm text-indigo-700 mb-6">
          Receba uma análise personalizada baseada em seus números atuais.
        </p>

        {analysis ? (
          <div className="prose prose-indigo max-w-none mb-4">
            <div className="bg-white/60 p-4 rounded-xl text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
              {analysis}
            </div>
            <button 
              onClick={() => setAnalysis(null)}
              className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase"
            >
              <i className="fa-solid fa-rotate-left mr-1"></i> Limpar Análise
            </button>
          </div>
        ) : (
          <button 
            onClick={generateAnalysis}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              loading 
                ? 'bg-indigo-200 text-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
            }`}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i> Analisando cenário...
              </>
            ) : (
              <>
                Gerar Análise Financeira <i className="fa-solid fa-arrow-right"></i>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GeminiAnalysis;
