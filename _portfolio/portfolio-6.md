---
title: "Application of autoencoder neural networks for CFD Problems"
excerpt: "**Executive Summary:** Drag and lift forces are important quantities in systems where fluid dynamics are present. Drag force can cause energy losses in systems such as airplanes and trucks. Our goal was to reduce the energy losses caused by drag force. In order to achieve this goal, we considered several approaches.\n\n

We first designed a toy problem for which we could extract simulation data. The toy problem consisted of a cylinder inside a rectangular tube with flow passing over it. We applied two different approaches to reduce the drag force acting on the cylinders. First one was to have two jets located on the cylinder which would be used to control the flow passing over the cylinder. We used COMSOL to generate data for this case. But the data generation step in COMSOL takes a long time. Therefore, we decided to try another approach. The second approach made use of magnus effect by creating a rotation effect on the cylinder instead of utilizing the jets. We used fluid dynamics equations in MATLAB to generate data for this case.\n\n

In order to minimize the drag force acting on the cylinder, in both approaches, we developed a machine learning model which would predict lift coefficient and drag coefficient values from the 2D stress field images from the surface of the cylinder. Our model consisted of autoencoder layers followed by a shallow network. The autoencoders were used for local data compression and the shallow network was used for regression.\n\n

We managed to accurately predict drag and lift coefficients and reconstruct the encoded images. This model can be used to predict the drag and lift coefficients acting on the system and minimize the drag force acting on the system by optimizing the control parameter."
collection: portfolio
---

**Executive Summary:** Drag and lift forces are important quantities in systems where fluid dynamics are present. Drag force can cause energy losses in systems such as airplanes and trucks. Our goal was to reduce the energy losses caused by drag force. In order to achieve this goal, we considered several approaches.

We first designed a toy problem for which we could extract simulation data. The toy problem consisted of a cylinder inside a rectangular tube with flow passing over it. We applied two different approaches to reduce the drag force acting on the cylinders. First one was to have two jets located on the cylinder which would be used to control the flow passing over the cylinder. We used COMSOL to generate data for this case. But the data generation step in COMSOL takes a long time. Therefore, we decided to try another approach. The second approach made use of magnus effect by creating a rotation effect on the cylinder instead of utilizing the jets. We used fluid dynamics equations in MATLAB to generate data for this case.

In order to minimize the drag force acting on the cylinder, in both approaches, we developed a machine learning model which would predict lift coefficient and drag coefficient values from the 2D stress field images from the surface of the cylinder. Our model consisted of autoencoder layers followed by a shallow network. The autoencoders were used for local data compression and the shallow network was used for regression.

We managed to accurately predict drag and lift coefficients and reconstruct the encoded images. This model can be used to predict the drag and lift coefficients acting on the system and minimize the drag force acting on the system by optimizing the control parameter.

In order to access the github repo, click [here](https://github.com/EdinGuso/ENS492-Graduation-Project)
