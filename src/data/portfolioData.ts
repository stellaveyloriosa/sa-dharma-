export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  status: 'Published' | 'Under Review' | 'Preprint' | 'In Preparation' | 'Patent';
  type: 'Journal' | 'Conference' | 'Book Chapter' | 'Preprint' | 'Patent';
  doi?: string;
  url?: string;
  abstract: string;
  tags: string[];
  bibtex: string;
}

export interface ResearchPosition {
  id: string;
  role: string;
  institution: string;
  location: string;
  period: string;
  supervisors?: string;
  description: string[];
  tags: string[];
  highlight?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Single-Cell Omics' | 'Deep Learning & GNN' | 'Biophysical Simulation' | 'Medical Imaging';
  repoName: string;
  githubUrl: string;
  description: string;
  architecture: string;
  keyResults: string[];
  tags: string[];
  license?: string;
}

export const PERSONAL_INFO = {
  name: 'Sa Dharmasastha Karthikeya',
  preferredName: 'Dharmasastha Karthikeya',
  emails: ['dharmasastha.v.biomed@gmail.com', 'darren.v.biomed@gmail.com'],
  phone: '+91 9949256647',
  orcid: '0009-0005-5355-3711',
  orcidUrl: 'https://orcid.org/0009-0005-5355-3711',
  scholarUrl: 'https://scholar.google.com/citations?user=oTUMMkMAAAAJ&hl=en',
  githubUrl: 'https://github.com/Dharmasastha2005',
  linkedinUrl: 'https://www.linkedin.com/in/sa-dharmasastha-karthikeya-p-678936370/',
  title: 'Biomedical Engineering & Computational Oncology Researcher',
  summary:
    'Biomedical Engineering graduate with a formally conferred Minor Degree in Artificial Intelligence & Machine Learning, specialising in computational approaches to single-cell biology and cancer systems modelling. Research spans mechanistically-grounded ML, gene regulatory network inference, agent-based modelling, and multi-omics integration, with active work in single-cell foundation models and KAN-based GRN inference at Ashoka University. Committed to building interpretable, biologically-grounded computational frameworks that recover biological structure from high-dimensional molecular data.',
  education: {
    institution: "Vignan's University (VFSTR)",
    location: 'Vadlamudi, India',
    degree: 'Bachelor of Technology (B.Tech) – Biomedical Engineering',
    minor: 'Minor Degree in Artificial Intelligence & Machine Learning',
    cgpa: '8.72 / 10.0',
    honors: 'First Class with Distinction',
    period: 'Aug 2022 – Jun 2026',
  },
};

export const RESEARCH_POSITIONS: ResearchPosition[] = [
  {
    id: 'iit-bombay',
    role: "Bachelor's Thesis & IRCC Research Fellow",
    institution: 'Indian Institute of Technology (IIT) Bombay',
    location: 'School of Biosciences & Bioengineering, Mumbai',
    period: 'Jan 2026 – Jun 2026',
    supervisors: 'Dr. Anirban Banerjee (IIT Bombay) & Dr. Amit Kumar Singh (VFSTR)',
    highlight: 'One of 8 selected nationally · Fully Funded IRCC Fellow',
    description: [
      'Developed a computational engineering pipeline for structural optimisation of an archaeal AAA+ ATPase as a VCP/p97-inspired therapeutic construct for targeted bacterial killing.',
      'Integrated residue-priority Random Forest modelling, ProteinMPNN-based sequence redesign, and iterative deletion, evaluated via AlphaFold2 structural scoring and backbone geometry metrics.',
      'Executed 150 ns molecular dynamics simulations on IIT Bombay’s ParamRudra HPC infrastructure to evaluate conformational stability and flexibility profiles.',
      'Conducted ATP docking with a 30× average binding affinity to the hypothesised protein, producing a validated wet-lab hypothesis candidate.',
    ],
    tags: ['ProteinMPNN', 'AlphaFold2', 'ParamRudra HPC', 'GROMACS 150ns', 'AutoDock Vina', 'AAA+ ATPase'],
  },
  {
    id: 'ashoka-kcdh',
    role: 'Research Trainee (Virtual)',
    institution: 'Koita Centre for Digital Health, Ashoka University',
    location: 'Sonipat, India',
    period: 'Sep 2026 – Present',
    supervisors: 'Dr. Kedar Natarajan & Shreyansh Priyadarshi (PhD Candidate)',
    highlight: 'Interpretable GRN Inference & Single-Cell Foundation Models',
    description: [
      'Designing and implementing computational pipelines to infer gene regulatory networks (GRNs) from single-cell transcriptomic data.',
      'Pioneering Kolmogorov-Arnold Networks (scKAN) and deep structural equation modelling (DeepSEM) as interpretable alternatives to standard black-box GRN inference.',
      'Applying trajectory-informed algorithms to unmask regulatory logic governing cell state transitions in scRNA-seq datasets.',
      'Evaluating single-cell foundation model architectures (scGPT, scKAN) for immune cell subtype discovery and cross-lineage dynamics.',
    ],
    tags: ['scKAN', 'DeepSEM', 'Single-Cell Foundation Models', 'scGPT', 'Trajectory Inference', 'scRNA-seq'],
  },
  {
    id: 'ashoka-bdsa',
    role: 'Biomedical Data Summer Fellow (BDSA)',
    institution: 'Ashoka University (Yale-affiliated Training Program)',
    location: 'Sonipat, India',
    period: 'Jul 2026 – Aug 2026',
    supervisors: 'Dr. Anasuya Chakrabarty (Ashoka) & Faculty from Yale / UMich',
    highlight: '1 of 20 selected nationally · Yale-affiliated Program',
    description: [
      'Intensive training across quantitative genomics, medical imaging, digital health, disease genetics, and biomedical ethics.',
      'Contributed to a faculty-mentored computational research project investigating Sex Differences in Genetic Architectures of Testosterone and Cardio-Metabolic Traits in Humans.',
      'Delivered presentation of statistical genetics and epidemiological findings at the BDSA national research symposium.',
    ],
    tags: ['Statistical Genetics', 'Cardio-Metabolic Traits', 'GWAS', 'Yale BDSA', 'Quantitative Genomics'],
  },
  {
    id: 'srm-ap',
    role: 'Nanobiotechnology Research Intern (Wet Lab)',
    institution: 'SRM University–AP',
    location: 'Amaravati, India',
    period: 'May 2025 – Jul 2025',
    supervisors: 'Dr. Anil K Suresh',
    highlight: 'Experimental Nanomedicine & Dynamical Modeling',
    description: [
      'Performed bacterial cell culture and UV–Vis spectrophotometry to examine nanoparticle interactions in cancer-mimicking environments.',
      'Applied machine learning classification and dynamical behaviour differential equations to model dose-dependent biological responses.',
    ],
    tags: ['Wet Lab', 'Bacterial Culture', 'UV-Vis Spectrophotometry', 'Nanomaterials', 'Dynamical Modeling'],
  },
  {
    id: 'kamineni',
    role: 'Clinical Observatorship Fellow',
    institution: 'Kamineni Multi-Speciality Hospital',
    location: 'Kanuru, India',
    period: 'May 2024 – Jul 2024',
    highlight: 'Clinical Systems & Medical Device Lifecycle',
    description: [
      'Completed structured clinical observatorship across intensive care, surgical theatres, and diagnostic imaging units.',
      'Gained direct exposure to biomedical equipment operation, preventive maintenance protocols, and clinical workflow integration.',
      'Collaborated with clinicians and senior biomedical engineers on equipment lifecycle management and safety regulations.',
    ],
    tags: ['Clinical Engineering', 'Medical Devices', 'Healthcare Workflows', 'ICU Instrumentation'],
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'patent-bilirubinometer',
    title: 'Pocket Neonatal Bilirubinometer',
    authors: 'Sa Dharmasastha Karthikeya et al.',
    venue: 'Indian Patent Office — Design Registration No. 6325190',
    year: 2023,
    status: 'Patent',
    type: 'Patent',
    abstract:
      'A non-invasive, portable optical medical device for rapid transcutaneous bilirubin estimation in neonates. Incorporates dual-wavelength spectrophotometric reflectance sensing calibrated for microvascular dermal scattering, reducing infant trauma and enabling point-of-care hyperbilirubinemia screening.',
    tags: ['Medical Device Patent', 'Non-Invasive Diagnostics', 'Neonatal Health', 'Optical Transcutaneous'],
    bibtex: `@patent{karthikeya2023bilirubinometer,
  title={Pocket Neonatal Bilirubinometer},
  author={Karthikeya, Sa Dharmasastha and others},
  year={2023},
  number={Design No. 6325190},
  note={Registered Design Patent, Class Medical Instruments}
}`,
  },
  {
    id: 'crc-abm-radiotherapy',
    title: 'A Clinically Inspired Hybrid Agent Based Model of Colorectal Cancer Growth and Regression under Fractionated Radiotherapy with Immune and Metabolic Feedback',
    authors: 'Sa Dharmasastha Karthikeya',
    venue: 'Computers in Biology and Medicine (Under Review; prior version published preprint)',
    year: 2026,
    status: 'Under Review',
    type: 'Journal',
    abstract:
      'A multi-scale computational framework modeling 3D colorectal cancer spheroids subjected to clinical fractionated radiotherapy protocols (2 Gy fractions). Couples physical cellular mechanics with intra-tumoral hypoxia, glucose depletion, and CD8+ cytotoxic T-cell infiltration dynamics to simulate therapy-induced tumor regression and microenvironment remodeling.',
    tags: ['Agent-Based Modelling', 'Colorectal Cancer', 'Fractionated Radiotherapy', 'Immune Infiltration', 'Tumor Hypoxia'],
    bibtex: `@article{karthikeya2026crcabm,
  title={A Clinically Inspired Hybrid Agent Based Model of Colorectal Cancer Growth and Regression under Fractionated Radiotherapy with Immune and Metabolic Feedback},
  author={Karthikeya, Sa Dharmasastha},
  journal={Computers in Biology and Medicine},
  year={2026},
  note={Under Review}
}`,
  },
  {
    id: 'aip-nsclc-prognosis',
    title: 'Comparative analysis between linear and non-linear predictive modelling for treatment prognosis: A case study in the treatment of non-small cell lung cancer',
    authors: 'Sa Dharmasastha Karthikeya, Prathiba Jonnala',
    venue: 'AIP Conference Proceedings, Vol. 3348, Issue 1, 040003',
    year: 2026,
    status: 'Published',
    type: 'Conference',
    doi: '10.1063/5.0251842',
    url: 'https://doi.org/10.1063/5.0251842',
    abstract:
      'Investigates the comparative efficacy of linear versus non-linear machine learning architectures for survival and treatment prognosis in non-small cell lung cancer (NSCLC) cohorts. Demonstrates superior prognostic discrimination using ensemble non-linear formulations capturing high-dimensional feature interactions.',
    tags: ['AIP Publishing', 'NSCLC', 'Predictive Prognosis', 'Machine Learning', 'Clinical Oncology'],
    bibtex: `@article{karthikeya2026comparative,
  title={Comparative analysis between linear and non-linear predictive modelling for treatment prognosis: A case study in the treatment of non-small cell lung cancer},
  author={Karthikeya, Sa Dharmasastha and Jonnala, Prathiba},
  journal={AIP Conference Proceedings},
  volume={3348},
  number={1},
  pages={040003},
  year={2026},
  publisher={AIP Publishing LLC}
}`,
  },
  {
    id: 'crc-press-blockchain',
    title: 'Implementation of Blockchain for Secure Data Analysis in IoT Healthcare Systems',
    authors: 'P. V. Madhav, J. Sahithi, P. S. D. Karthikeya',
    venue: 'Blockchain and Digital Twin Enabled IoT Networks, CRC Press (Taylor & Francis Group)',
    year: 2024,
    status: 'Published',
    type: 'Book Chapter',
    abstract:
      'Presents a cryptographic distributed ledger architecture designed to secure patient telemetry streaming from IoMT (Internet of Medical Things) monitors. Guarantees tamper-proof data provenance, fine-grained access control, and low-latency validation in federated healthcare environments.',
    tags: ['CRC Press', 'Scopus-Indexed', 'IoMT', 'Decentralized Security', 'Health Data Privacy'],
    bibtex: `@incollection{madhav2024implementation,
  title={Implementation of Blockchain for Secure Data Analysis in IoT Healthcare Systems},
  author={Madhav, P V and Sahithi, J and Karthikeya, P S D},
  booktitle={Blockchain and Digital Twin Enabled IoT Networks},
  publisher={CRC Press},
  year={2024}
}`,
  },
  {
    id: 'preprint-hepatic-programming',
    title: 'Computational Cellular Programming: In-Silico Modelling of Direct and Reprogrammed Hepatic Lineage Induction via Gene Regulatory and Functional Dynamics',
    authors: 'Sa Dharmasastha Karthikeya',
    venue: 'Preprint Archive (bioRxiv / ResearchGate)',
    year: 2026,
    status: 'Preprint',
    type: 'Preprint',
    abstract:
      'Constructs dynamical ODE and Boolean network models of transcription factor perturbations (Hnf4a, Foxa3, Gata4) driving lineage conversion of fibroblasts into functional induced hepatocytes (iHeps). Quantifies the energetic barrier landscape of cellular fate transitions.',
    tags: ['Cellular Reprogramming', 'Hepatic Lineage', 'Dynamical GRN', 'Waddington Landscape', 'In-Silico Systems'],
    bibtex: `@article{karthikeya2026hepatic,
  title={Computational Cellular Programming: In-Silico Modelling of Direct and Reprogrammed Hepatic Lineage Induction via Gene Regulatory and Functional Dynamics},
  author={Karthikeya, Sa Dharmasastha},
  journal={Preprint},
  year={2026}
}`,
  },
  {
    id: 'ieee-cardio-gnn',
    title: 'Confidence-Weighted Graph Neural Networks for Cardiovascular Disease–Gene Association Prediction: A Comparative Study of GCN and GAT',
    authors: 'Sa Dharmasastha Karthikeya',
    venue: 'IEEE BioXplore 2026 / Submitted to IEEE BIBE 2026',
    year: 2026,
    status: 'In Preparation',
    type: 'Conference',
    abstract:
      'Formulates gene-disease association discovery as an inductive link-prediction task on heterogeneous biomedical knowledge graphs. Implements confidence-weighted message passing across Graph Attention Networks (GAT) and GraphSAGE to prioritize cardiovascular risk variants with high interpretability.',
    tags: ['Graph Neural Networks', 'PyTorch Geometric', 'GAT', 'Cardiovascular Genetics', 'Link Prediction'],
    bibtex: `@article{karthikeya2026cvdgnn,
  title={Confidence-Weighted Graph Neural Networks for Cardiovascular Disease--Gene Association Prediction},
  author={Karthikeya, Sa Dharmasastha},
  journal={IEEE BioXplore Conference},
  year={2026}
}`,
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'atpase-structural-pipeline',
    title: 'Rational Protein Structural Optimisation Pipeline',
    category: 'Biophysical Simulation',
    repoName: 'Rational-Protein-Structural-Optimisation-Pipeline',
    githubUrl: 'https://github.com/Dharmasastha2005/Rational-Protein-Structural-Optimisation-Pipeline',
    description:
      'Computational engineering pipeline for rational AAA+ ATPase minimization. Combines conservation scoring, Random Forest residue prioritization, ProteinMPNN sequence redesign, AlphaFold2 validation, and 150 ns GROMACS MD simulations on IIT Bombay’s ParamRudra HPC cluster.',
    architecture: 'Python · AlphaFold2 · ProteinMPNN · GROMACS 2024 · AutoDock Vina · PyMOL',
    keyResults: [
      '150 ns molecular dynamics trajectory validating minimal core stability',
      '30× average ATP binding docking score retention across engineered models',
      'Targeted bacterial killing construct candidate for experimental wet-lab assays',
    ],
    tags: ['Protein Engineering', 'AlphaFold2', 'HPC ParamRudra', 'MD Simulation'],
    license: 'MIT',
  },
  {
    id: 'crc-abm-simulation',
    title: 'The ColoRectal Cancer ABM Model (Physical Biology)',
    category: 'Biophysical Simulation',
    repoName: 'The-ColoRectal-Cancer-ABM-Model---Physical-Biology',
    githubUrl: 'https://github.com/Dharmasastha2005/The-ColoRectal-Cancer-ABM-Model---Physical-Biology',
    description:
      'Agent-based multi-cellular simulation of colorectal adenocarcinoma response to fractionated radiotherapy (2 Gy fractions). Implements stochastic cellular mechanics, oxygen diffusion-reaction PDEs, and metabolic stress feedback with cytotoxic lymphocyte infiltration.',
    architecture: 'Python · NumPy · SciPy PDE Solvers · Matplotlib · Mesa Agent Framework',
    keyResults: [
      'Coupled ODE/PDE oxygen delivery field reproducing tumor core hypoxia',
      'Fractionated radiation kill curves calibrated against clinical radiobiology models',
      'Preprint featured and submitted to Computers in Biology and Medicine',
    ],
    tags: ['Agent-Based Model', 'Radiobiology', 'Cancer Systems', 'PDE Diffusion'],
    license: 'Apache 2.0',
  },
  {
    id: 'sc-cellular-states',
    title: 'Inference & Validation of Cellular States using Representation Learning',
    category: 'Single-Cell Omics',
    repoName: 'Inference-and-Validation-of-Cellular-States-using-Representation-Learning-and-Machine-Learning',
    githubUrl: 'https://github.com/Dharmasastha2005/Inference-and-Validation-of-Cellular-States-using-Representation-Learning-and-Machine-Learning',
    description:
      'End-to-end single-cell transcriptomics pipeline on real PBMC datasets. Implements a Variational Autoencoder (VAE) for continuous latent manifold inference, KMeans clustering, dual validation using Random Forest and Graph Convolutional Networks (GCN), Wilcoxon differential expression, and canonical marker verification.',
    architecture: 'PyTorch VAE · PyTorch Geometric GCN · Scanpy · scikit-learn · Wilcoxon Rank-Sum',
    keyResults: [
      'Reconstructed immune cell taxonomy (CD4/CD8 T-cells, Monocytes, B-cells, NK) unsupervised',
      '0.94+ classification fidelity across dual Random Forest and GCN validation',
      'Direct identification of key cell-surface and lineage marker genes',
    ],
    tags: ['VAE', 'Single-Cell', 'GCN', 'PBMC', 'Scanpy'],
    license: 'Apache 2.0',
  },
  {
    id: 'cardio-gat-gnn',
    title: 'Cardiovascular Disease GAT & Confidence GraphSAGE Prediction',
    category: 'Deep Learning & GNN',
    repoName: 'Cardiovascular-Diseases-GAT-and-GAN-Prediction-Models',
    githubUrl: 'https://github.com/Dharmasastha2005/Cardiovascular-Diseases-GAT-and-GAN-Prediction-Models',
    description:
      'Confidence-weighted Graph Attention Networks (GAT) and GraphSAGE architectures for prioritizing candidate disease-gene associations in cardiovascular pathologies, benchmarked against MLP baselines.',
    architecture: 'PyTorch Geometric · NetworkX · DisGeNET Knowledge Graph · Scikit-Learn',
    keyResults: [
      'Novel link prediction scoring capturing disease subgraph neighborhood topology',
      'Substantially outperformed conventional tabular classifiers on imbalanced pairs',
      'Accepted at IEEE BioXplore 2026 conference',
    ],
    tags: ['Graph Neural Networks', 'PyTorch Geometric', 'GAT', 'Cardiovascular'],
    license: 'Apache 2.0',
  },
  {
    id: 'crc-nsclc-gene-profiling',
    title: 'Genomic Profiling & Machine Learning Classification (GSE68086)',
    category: 'Single-Cell Omics',
    repoName: 'CRC-NSCLC-Gene-Profiling',
    githubUrl: 'https://github.com/Dharmasastha2005/CRC-NSCLC-Gene-Profiling',
    description:
      'End-to-end transcriptomic analysis of GEO dataset GSE68086 comparing Colorectal Cancer (CRC) and Non-Small Cell Lung Cancer (NSCLC). Includes normalization, differential expression, PCA/UMAP dimensional projection, volcano plots, and Random Forest biomarker discovery.',
    architecture: 'Python · GEOparse · Scanpy · DESeq2 principles · Seaborn',
    keyResults: [
      'Identified top differentially expressed driver genes separating tumor sub-lineages',
      'High-precision multi-class classifier separating malignant vs adjacent normal samples',
    ],
    tags: ['GEO Dataset', 'Differential Expression', 'Transcriptomics', 'Biomarkers'],
    license: 'GNU GPL v3.0',
  },
  {
    id: 'ultrasound-fuzzy-unet',
    title: 'Ultrasound Image Denoising through Fuzzy-Weighted U-Net',
    category: 'Medical Imaging',
    repoName: 'Ultrasound-Image-Denoising-Fuzzy-Weighted-U-Net-',
    githubUrl: 'https://github.com/Dharmasastha2005/Ultrasound-Image-Denoising-Fuzzy-Weighted-U-Net-',
    description:
      'Deep learning pipeline for speckle noise suppression and acoustic signal restoration in clinical ultrasound scans, integrating fuzzy edge-preserving loss weighting into an asymmetric U-Net.',
    architecture: 'PyTorch · U-Net Architecture · Fuzzy Logic Loss Function · OpenCV',
    keyResults: [
      'Superior PSNR (Peak Signal-to-Noise Ratio) and SSIM metrics over standard BM3D filters',
      'Preserved acoustic tissue boundaries vital for diagnostic lesion margin assessment',
    ],
    tags: ['Medical Imaging', 'Ultrasound Denoising', 'U-Net', 'Fuzzy Logic'],
    license: 'GNU GPL v3.0',
  },
  {
    id: 'blood-cell-classification',
    title: 'Cell-Type Classification in Blood Smears (BCCD Dataset)',
    category: 'Medical Imaging',
    repoName: 'Cell-Type-Classification-in-Blood-Smear-Images-using-Classical-Image-Processing-and-Machine-Learning',
    githubUrl: 'https://github.com/Dharmasastha2005/Cell-Type-Classification-in-Blood-Smear-Images-using-Classical-Image-Processing-and-Machine-Learning',
    description:
      'Interpretable, lightweight computer vision pipeline for segmenting and classifying white blood cells (WBCs), red blood cells (RBCs), and platelets from microscopic blood smear images.',
    architecture: 'Python · OpenCV · Morphological Watershed · Haralick Textures · Random Forest',
    keyResults: [
      'Lightweight edge-computable pipeline requiring no GPU hardware',
      'High diagnostic accuracy on morphological cell type differentiation',
    ],
    tags: ['Hematology', 'Microscopy', 'Image Processing', 'OpenCV'],
    license: 'GNU GPL v3.0',
  },
  {
    id: 'pancreatic-single-cell',
    title: 'Single-Cell Omics Modelling for Pancreatic Cell Fate Analysis',
    category: 'Single-Cell Omics',
    repoName: 'Pancreatic-Single-Cell-Analysis',
    githubUrl: 'https://github.com/Dharmasastha2005/Pancreatic-Single-Cell-Analysis',
    description:
      'Investigation of pancreatic beta-cell dedifferentiation and plasticity under diabetic stress. Reconstructs pseudotime trajectories and regulatory circuits to simulate restorative therapeutic interventions.',
    architecture: 'Python · Scanpy · Monocle3/PAGA Trajectory · Gene Regulatory Networks',
    keyResults: [
      'Uncovered branching trajectory bifurcations separating functional vs dedifferentiated beta-cells',
      'In silico TF knockdown simulation predicting insulin secretion recovery pathways',
    ],
    tags: ['Pancreatic Biology', 'Beta-Cell Plasticity', 'Trajectory Inference', 'scRNA-seq'],
    license: 'GNU GPL v3.0',
  },
  {
    id: 'radiopharmaceutical-brownian',
    title: 'Modeling Radiopharmaceutical Diffusion via Brownian Dynamics',
    category: 'Biophysical Simulation',
    repoName: 'Modeling-Radiopharmaceutical-Diffusion-via-Brownian-Dynamics',
    githubUrl: 'https://github.com/Dharmasastha2005/Modeling-Radiopharmaceutical-Diffusion-via-Brownian-Dynamics',
    description:
      'Simulates stochastic Brownian transport of radioactive tracer molecules through tortuous interstitial tumor matrices versus healthy parenchyma, accounting for interstitial fluid pressure barriers.',
    architecture: 'Python · Stochastic Langevin Dynamics · Monte Carlo Sampling · Matplotlib 3D',
    keyResults: [
      'Quantified microvascular extravasation impedance in dense extracellular matrices',
      'Presented at BioCloud 2025 conference',
    ],
    tags: ['Brownian Dynamics', 'Radiopharmaceuticals', 'Interstitial Flow', 'Stochastic'],
    license: 'GNU GPL v3.0',
  },
  {
    id: 'monte-carlo-radiation',
    title: 'Monte Carlo Simulation of Radiation Energy Deposition',
    category: 'Biophysical Simulation',
    repoName: 'Monte-Carlo-Simulation-of-Radiation-Energy-Deposition',
    githubUrl: 'https://github.com/Dharmasastha2005/Monte-Carlo-Simulation-of-Radiation-Energy-Deposition',
    description:
      'Models photon transport, Compton scattering, and depth-dose energy deposition curves across heterogeneous human tissues (skin, subcutaneous fat, skeletal muscle, tumor core).',
    architecture: 'Python · Monte Carlo Stochastic Transport · Beer-Lambert Attenuation Matrices',
    keyResults: [
      'Accurate Bragg peak and depth-dose profile validation against standard NIST data tables',
      'Presented at BioCloud 2025 conference',
    ],
    tags: ['Monte Carlo', 'Radiation Physics', 'Dosimetry', 'Biophysics'],
    license: 'GNU AGPL v3.0',
  },
  {
    id: 'attention-res-unet',
    title: 'Attention-Res-U-Net for Brain MRI Tumor Segmentation',
    category: 'Medical Imaging',
    repoName: 'Attention-Res-U-Net-Project',
    githubUrl: 'https://github.com/Dharmasastha2005/Attention-Res-U-Net-Project',
    description:
      'Deep residual U-Net equipped with soft attention gates to focus on glioma and meningioma tumor boundaries while suppressing non-informative background voxels in multi-modal brain MRI scans.',
    architecture: 'PyTorch · Attention Gates · Residual Blocks · BraTS MRI Dataset',
    keyResults: [
      'Substantial Dice similarity coefficient improvement over classic U-Net on small necrotic margins',
    ],
    tags: ['Neuro-Oncology', 'Brain MRI', 'Attention Gates', 'Deep Learning'],
    license: 'GNU GPL v3.0',
  },
  {
    id: 'ecg-cnn-lstm',
    title: 'ECG Pan-Tompkins & CNN-LSTM Anomaly Detection',
    category: 'Deep Learning & GNN',
    repoName: 'ECG-Pan-Tompkins-CNN-LSTM.',
    githubUrl: 'https://github.com/Dharmasastha2005/ECG-Pan-Tompkins-CNN-LSTM.',
    description:
      'Hybrid electrophysiological pipeline combining classical Pan-Tompkins QRS wave detection with spatio-temporal CNN-LSTM networks for automated arrhythmia classification from lead-II signals.',
    architecture: 'Python · SciPy Signal · PyTorch CNN-LSTM · MIT-BIH Arrhythmia Database',
    keyResults: [
      'Real-time QRS detection latency < 15 ms with robust noise immunity to baseline wander',
    ],
    tags: ['ECG Signal Processing', 'CNN-LSTM', 'Pan-Tompkins', 'Biomedical Signals'],
    license: 'GNU GPL v3.0',
  },
];

export const SKILLS_CATEGORIES = [
  {
    category: 'Computational Single-Cell & Multi-Omics',
    skills: [
      'Scanpy & Seurat Workflows',
      'Trajectory Inference (PAGA, Monocle)',
      'scKAN (Kolmogorov-Arnold Networks)',
      'DeepSEM (Structural Equation Models)',
      'Single-Cell Foundation Models (scGPT)',
      'Differential Expression (DESeq2, Wilcoxon)',
      'Spatial Transcriptomics Pipelines',
      'ssGSEA & Pathway Enrichment',
      'TCGA & GEO Data Ingestion',
    ],
  },
  {
    category: 'Machine Learning & AI for Biology',
    skills: [
      'PyTorch & PyTorch Geometric (PyG)',
      'Graph Neural Networks (GCN, GAT, GraphSAGE)',
      'Variational Autoencoders (VAE) & Latent Manifolds',
      'Random Forest & Gradient Boosting',
      'Medical Image CNNs & U-Net (Attention ResU-Net)',
      'CNN-LSTM Temporal Sequence Models',
      'Explainable AI & Biological Attribution',
      'LoRA Fine-Tuning & Embeddings',
    ],
  },
  {
    category: 'Biophysical Modelling & Structural Simulation',
    skills: [
      'AlphaFold2 Structural Prediction & Scoring',
      'ProteinMPNN Sequence Redesign',
      'GROMACS Molecular Dynamics (150ns HPC)',
      'AutoDock Vina Ligand Docking',
      'Agent-Based Modelling (Mesa, Python)',
      'Nonlinear ODE/PDE Reaction-Diffusion',
      'Monte Carlo Radiation Transport',
      'COMSOL Multiphysics (Biofluids & FSI)',
    ],
  },
  {
    category: 'HPC, Tools & Engineering Literacy',
    skills: [
      'ParamRudra HPC & SLURM Job Scheduling',
      'Python (NumPy, SciPy, Pandas, Matplotlib)',
      'R / Bioconductor Environment',
      'MATLAB & Signal Processing Toolbox',
      'Git / GitHub Version Control',
      'LaTeX / Overleaf Scientific Typesetting',
      'Bash Scripting & Linux Environments',
      'Medical Device Hardware & Transcutaneous Sensors',
    ],
  },
];

export const CERTIFICATIONS = [
  {
    title: 'Genomic Data Science Specialisation',
    issuer: 'Johns Hopkins University (Coursera)',
    period: 'Jun 2025 – Dec 2025',
    focus: 'Command Line Genomics, Bioconductor, Python for Genomic Data, Statistical Genomics',
  },
  {
    title: "Researcher's Guide to Omic Data Specialization",
    issuer: 'Fred Hutch Cancer Center (Coursera)',
    period: 'Aug 2026 – Oct 2026',
    focus: 'Cancer Genomics, Reproducible Omics Workflows, Transcriptomics Integration',
  },
  {
    title: 'Systems Biology & Biotechnology Specialisation',
    issuer: 'Icahn School of Medicine at Mount Sinai',
    period: 'May 2025 – Sep 2025',
    focus: 'Intro to Systems Biology, Experimental Systems Methods, Biological Network Analysis',
  },
  {
    title: 'Biomedical Equipment: Repair & Healthcare Tech Management',
    issuer: 'TU Delft University (edX)',
    period: '2024',
    focus: 'Clinical Safety, Equipment Lifecycle, Preventative Maintenance Protocols',
  },
  {
    title: 'Mentee – Connect Mentor Program (CMP 2025)',
    issuer: 'IEEE India Council IAYPC',
    period: 'Jul 2025 – Jan 2026',
    focus: 'Industry-Academia Young Professionals Mentorship in Biomedical Engineering',
  },
  {
    title: 'Health Psychology Research',
    issuer: 'Indian Institute of Technology (IIT) Hyderabad',
    period: 'Jun 2025',
    focus: 'Psychophysiological Research Methods & Behavioral Health Modelling',
  },
];
