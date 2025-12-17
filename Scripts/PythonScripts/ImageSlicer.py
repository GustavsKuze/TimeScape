# ----- Setup -----
# Imports
import os
import cv2
import sys
import time

# Variables
videoPath = "E:\\Videos\\OBS\\2025-11-19 17-02-39.mp4"
outputPath = "E:\\Scripts\\Wallpaper Manager\\Sliced Video Bin"

wallPaperName = "test"



# ----- Create output folder -----
print("Creating output folder...")

combinedPath = os.path.join(outputPath, wallPaperName)

# Create the directory if it doesn't exist
try:
    os.makedirs(combinedPath, exist_ok=True)
    print(f"Successfully created folder at: {combinedPath}")
except Exception as e:
    print(f"Error creating directory: {e}")

print("\n")


# ----- Get data -----
print("Getting video data...")

# Load the video file
sourceVideo = cv2.VideoCapture(videoPath)

totalFrames = int(sourceVideo.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Total Frames: {totalFrames}")

irlTimePerFrame = 86400 / totalFrames
print(f"IRL Time Per Frame: {irlTimePerFrame} seconds")

videoFPS = sourceVideo.get(cv2.CAP_PROP_FPS)
videoLength = totalFrames / videoFPS
print(f"Video Length: {videoLength} seconds")

print("\n")


# ----- Slice Video -----
print("Slicing...")

startTime = time.time()
fpsList = []

for frameNumber in range(totalFrames):
    # Read the frame
    ret, frame = sourceVideo.read()
    
    if ret:
        # Save the frame as an image
        frameIRLTime = frameNumber * irlTimePerFrame
        frameFilename = f"{frameIRLTime:.2f}.jpg"
        framePath = os.path.join(combinedPath, frameFilename)
        cv2.imwrite(framePath, frame)
    else:
        print("Failed to read frame.")
        break
    
    # Time Calc (after processing to measure actual work time)
    endTime = time.time()
    frameTime = endTime - startTime
    fpsList.append(frameTime)
    if len(fpsList) > 1000:
        fpsList.pop(0)
    
    averageTimePerFrame = sum(fpsList) / len(fpsList)
    currentFPS = 1 / averageTimePerFrame
    
    secondsRemaining = (totalFrames - frameNumber - 1) / currentFPS
    minutes = int(secondsRemaining // 60)
    seconds = int(secondsRemaining % 60)
    
    # Progress Message
    progress_message = (
        f"\rSlicing Frame {frameNumber + 1}/{totalFrames} | "
        f"FPS: {currentFPS:.1f} | "
        f"Time Remaining: {minutes}m {seconds}s    "
    )
    
    print(progress_message, end="")
    sys.stdout.flush()
    
    # Update start time for next frame
    startTime = endTime