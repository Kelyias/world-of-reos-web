import {Rarity} from "./rarity";
import {MarkingSort} from "./marking-sort";
import {GeneType} from "./gene-type";

export class Marking {
    markingGene: MarkingGene;
    geneType: GeneType;

}

export class MarkingGene {
    phenotype: string;
    dominateSymbol: string;
    recessiveSymbol: string;
    rarity: Rarity;
    sorting: MarkingSort;
}

export const MARKINGS: MarkingGene[] = [
    {rarity: Rarity.COMMON, phenotype: "Barred", recessiveSymbol: "nBa", dominateSymbol: "BaBa", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Blanket", recessiveSymbol: "Bl", dominateSymbol: "BlBl", sorting: 1},
    {rarity: Rarity.COMMON, phenotype: "Bleached", recessiveSymbol: "nBe", dominateSymbol: "BeBe", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Brushed", recessiveSymbol: "nBr", dominateSymbol: "BrBr", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Collared", recessiveSymbol: "Co", dominateSymbol: "CoCo", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Dappled", recessiveSymbol: "nDp", dominateSymbol: "DapDap", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Diamond", recessiveSymbol: "Di", dominateSymbol: "DD", sorting: 1},
    {rarity: Rarity.COMMON, phenotype: "Dun", recessiveSymbol: "nDn", dominateSymbol: "DnDn", sorting: 1},
    {rarity: Rarity.COMMON, phenotype: "Dusted", recessiveSymbol: "Du", dominateSymbol: "DuDu", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Fleabitten", recessiveSymbol: "nFle", dominateSymbol: "FleFle", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Freckled", recessiveSymbol: "Fr", dominateSymbol: "FrFr", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Inked", recessiveSymbol: "nIn", dominateSymbol: "InIn", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Masked", recessiveSymbol: "Ma", dominateSymbol: "MaMa", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Oriental", recessiveSymbol: "Or", dominateSymbol: "OO", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Pangare", recessiveSymbol: "nPn", dominateSymbol: "PnPn", sorting: 1},
    {rarity: Rarity.COMMON, phenotype: "Ray", recessiveSymbol: "nR", dominateSymbol: "RR", sorting: 1},
    {rarity: Rarity.COMMON, phenotype: "Rimmed", recessiveSymbol: "nRm", dominateSymbol: "RmRm", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Ringed", recessiveSymbol: "nRi", dominateSymbol: "RiRi", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Sable", recessiveSymbol: "nSb", dominateSymbol: "sBsB", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Socks", recessiveSymbol: "nSo", dominateSymbol: "SoSo", sorting: 1},
    {rarity: Rarity.COMMON, phenotype: "Stockings", recessiveSymbol: "nSc", dominateSymbol: "ScSc", sorting: 1},
    {rarity: Rarity.COMMON, phenotype: "Striped", recessiveSymbol: "nSt", dominateSymbol: "StSt", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Tanspots", recessiveSymbol: "nTs", dominateSymbol: "TsTs", sorting: 1},
    {rarity: Rarity.COMMON, phenotype: "Underbelly", recessiveSymbol: "hU", dominateSymbol: "UU", sorting: 1},
    {rarity: Rarity.COMMON, phenotype: "Cheeky", recessiveSymbol: "nCk", dominateSymbol: "CkCk", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Hooded", recessiveSymbol: "nHo", dominateSymbol: "HoHo", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Pointed", recessiveSymbol: "nPo", dominateSymbol: "PoPo", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Skunk", recessiveSymbol: "nSk", dominateSymbol: "SkSk", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Snowflake", recessiveSymbol: "nSwf", dominateSymbol: "SwfSwf", sorting: -1},
    {rarity: Rarity.COMMON, phenotype: "Vitiligo", recessiveSymbol: "nVit", dominateSymbol: "VitVit", sorting: 1},

    {rarity: Rarity.UNCOMMON, phenotype: "Current", recessiveSymbol: "nCr", dominateSymbol: "CrCr", sorting: 1},
    {rarity: Rarity.UNCOMMON, phenotype: "Curtain", recessiveSymbol: "nCt", dominateSymbol: "CtCt", sorting: 1},
    {rarity: Rarity.UNCOMMON, phenotype: "Leopard", recessiveSymbol: "nLp", dominateSymbol: "LP", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Marbled", recessiveSymbol: "nMr", dominateSymbol: "MrMr", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Merle", recessiveSymbol: "nMrl", dominateSymbol: "MrlMrl", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Mist", recessiveSymbol: "nMi", dominateSymbol: "MiMi", sorting: 1},
    {rarity: Rarity.UNCOMMON, phenotype: "Overo", recessiveSymbol: "nOv", dominateSymbol: "OvOv", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Pebbled", recessiveSymbol: "pB", dominateSymbol: "PB", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Python", recessiveSymbol: "nPt", dominateSymbol: "PT", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Roan", recessiveSymbol: "nRa", dominateSymbol: "RaRa", sorting: 1},
    {rarity: Rarity.UNCOMMON, phenotype: "Rosettes", recessiveSymbol: "nRo", dominateSymbol: "RoRo", sorting: 1},
    {rarity: Rarity.UNCOMMON, phenotype: "Sooty", recessiveSymbol: "nSot", dominateSymbol: "SotSot", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Splash", recessiveSymbol: "nSpl", dominateSymbol: "SpSP", sorting: 1},
    {rarity: Rarity.UNCOMMON, phenotype: "Tabby", recessiveSymbol: "nTab", dominateSymbol: "TabTab", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Tobiano", recessiveSymbol: "nTb", dominateSymbol: "TbTb", sorting: 1},
    {rarity: Rarity.UNCOMMON, phenotype: "Veined", recessiveSymbol: "nVe", dominateSymbol: "VeVe", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Void", recessiveSymbol: "nVd", dominateSymbol: "VdVd", sorting: 1},
    {rarity: Rarity.UNCOMMON, phenotype: "Bloodmark", recessiveSymbol: "nBm", dominateSymbol: "BmBm", sorting: 1},
    {rarity: Rarity.UNCOMMON, phenotype: "Calico", recessiveSymbol: "nCal", dominateSymbol: "CalCal", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Fewspot", recessiveSymbol: "nFes", dominateSymbol: "FesFes", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Fishscaled", recessiveSymbol: "nFs", dominateSymbol: "FsFs", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Koi", recessiveSymbol: "nKi", dominateSymbol: "KiKi", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Panda", recessiveSymbol: "nPd", dominateSymbol: "PdPd", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Sabino", recessiveSymbol: "nSab", dominateSymbol: "SabSab", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Silken", recessiveSymbol: "nSlk", dominateSymbol: "SlkSlk", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Somatic", recessiveSymbol: "nSom", dominateSymbol: "SomSom", sorting: -1},
    {rarity: Rarity.UNCOMMON, phenotype: "Wolf", recessiveSymbol: "nWf", dominateSymbol: "WfWf", sorting: -1},

    {rarity: Rarity.RARE, phenotype: "Akhal", recessiveSymbol: "nAk", dominateSymbol: "AkAk", sorting: -1},
    {rarity: Rarity.RARE, phenotype: "Filigree", recessiveSymbol: "nFi", dominateSymbol: "FiFi", sorting: 1},
    {rarity: Rarity.RARE, phenotype: "Glasswork", recessiveSymbol: "nGl", dominateSymbol: "GlGl", sorting: 1},
    {rarity: Rarity.RARE, phenotype: "Genie", recessiveSymbol: "nGn", dominateSymbol: "GnGn", sorting: 1},
    {rarity: Rarity.RARE, phenotype: "Opalescent", recessiveSymbol: "nOp", dominateSymbol: "OpOp", sorting: -1},
    {rarity: Rarity.RARE, phenotype: "Rorschach", recessiveSymbol: "nRs", dominateSymbol: "RsRs", sorting: 1},
    {rarity: Rarity.RARE, phenotype: "Varnish", recessiveSymbol: "nVa", dominateSymbol: "VaVa", sorting: 1},
    {rarity: Rarity.RARE, phenotype: "Borealis", recessiveSymbol: "nBor", dominateSymbol: "BorBor", sorting: 1},
    {rarity: Rarity.RARE, phenotype: "Lacework", recessiveSymbol: "nLcw", dominateSymbol: "LcwLcw", sorting: 1},

    {rarity: Rarity.MODIFIER, phenotype: "Flaxen", recessiveSymbol: "nFl", dominateSymbol: "FlFl", sorting: -1},
    {rarity: Rarity.MODIFIER, phenotype: "Glint", recessiveSymbol: "Gl", dominateSymbol: "GG", sorting: 1},
    {rarity: Rarity.MODIFIER, phenotype: "Grey", recessiveSymbol: "Gr", dominateSymbol: "GrGr", sorting: -1},
    {rarity: Rarity.MODIFIER, phenotype: "Leucism", recessiveSymbol: "nEl", dominateSymbol: "LL", sorting: 1},
    {rarity: Rarity.MODIFIER, phenotype: "Melanism", recessiveSymbol: "nMel", dominateSymbol: "MelMel", sorting: 1},
    {rarity: Rarity.MODIFIER, phenotype: "Mottled", recessiveSymbol: "nMl", dominateSymbol: "MM", sorting: -1},
    {rarity: Rarity.MODIFIER, phenotype: "Outlined", recessiveSymbol: "nOt", dominateSymbol: "OtOt", sorting: -1},
    {rarity: Rarity.MODIFIER, phenotype: "Ticked", recessiveSymbol: "nTck", dominateSymbol: "TckTck", sorting: -1},
    {rarity: Rarity.MODIFIER, phenotype: "Umbra", recessiveSymbol: "nMb", dominateSymbol: "MB", sorting: 1}

];
