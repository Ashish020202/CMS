import React, { useState } from "react";
import { 
    Share2, 
    Copy, 
    Users, 
    Gift, 
    QrCode, 
    Percent, 
    Trophy,
    PlusCircle
} from "lucide-react";

type ReferralCode = {
    id: string;
    code: string;
    createdAt: Date;
    usedCount: number;
    creditEarned: number;
    influencerName?: string;
};

type ReferralTracking = {
    referralCodes: ReferralCode[];
    userReferralCode: string;
    totalReferralCredits: number;
};

const ReferralTracking: React.FC = () => {
    const [referralData, setReferralData] = useState<ReferralTracking>({
        referralCodes: [
            {
                id: "REF001",
                code: "HOTEL25OFF",
                createdAt: new Date(),
                usedCount: 15,
                creditEarned: 375,
                influencerName: "TravelBlogger123"
            },
            {
                id: "REF002",
                code: "SUMMER2024",
                createdAt: new Date(),
                usedCount: 8,
                creditEarned: 200,
                influencerName: "WanderLuxe"
            }
        ],
        userReferralCode: "MYREF2024",
        totalReferralCredits: 1
    });

    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [newReferralCode, setNewReferralCode] = useState({
        code: '',
        influencerName: ''
    });

    const handleCopyReferralCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const generateUniqueId = () => {
        return `REF${(referralData.referralCodes.length + 1).toString().padStart(3, '0')}`;
    };

    const handleCreateReferralCode = () => {
        if (!newReferralCode.code.trim()) {
            alert('Please enter a referral code');
            return;
        }

        const newCode: ReferralCode = {
            id: generateUniqueId(),
            code: newReferralCode.code.toUpperCase(),
            createdAt: new Date(),
            usedCount: 0,
            creditEarned: 0,
            influencerName: newReferralCode.influencerName || undefined
        };

        setReferralData(prev => ({
            ...prev,
            referralCodes: [...prev.referralCodes, newCode]
        }));

        // Reset the form
        setNewReferralCode({
            code: '',
            influencerName: ''
        });
    };

    return (
        <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-2xl overflow-hidden">
                
                <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center">
                            <Trophy className="mr-3 w-6 h-6" />
                            Referral & Coupon Tracking
                        </h2>
                    </div>
                </div>

                
                <div className="p-6 space-y-6">
                    {/* Personal Referral Code */}
                    <div className="bg-blue-50 dark:bg-gray-600 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Share2 className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                                <div>
                                    <h3 className="font-semibold text-gray-700 dark:text-white">
                                        Your Referral Code
                                    </h3>
                                    <p className="text-xl font-bold text-blue-600 dark:text-blue-300">
                                        {referralData.userReferralCode}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleCopyReferralCode(referralData.userReferralCode)}
                                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                            >
                                <Copy className="mr-2 w-4 h-4" />
                                {copiedCode === referralData.userReferralCode ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Share this code with friends. You'll earn $25 credit for each successful booking!
                        </p>
                    </div>

                    {/* Create New Referral Code */}
                    <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
                        <div className="flex items-center mb-4">
                            <PlusCircle className="w-6 h-6 mr-3 text-green-500 dark:text-green-400" />
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                                Create New Referral Code
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Referral Code
                                </label>
                                <input 
                                    type="text" 
                                    id="referralCode"
                                    value={newReferralCode.code}
                                    onChange={(e) => setNewReferralCode(prev => ({
                                        ...prev, 
                                        code: e.target.value
                                    }))}
                                    placeholder="Enter unique code"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="influencerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Influencer Name (Optional)
                                </label>
                                <input 
                                    type="text" 
                                    id="influencerName"
                                    value={newReferralCode.influencerName}
                                    onChange={(e) => setNewReferralCode(prev => ({
                                        ...prev, 
                                        influencerName: e.target.value
                                    }))}
                                    placeholder="Enter influencer name"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <button 
                                onClick={handleCreateReferralCode}
                                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center justify-center"
                            >
                                <PlusCircle className="mr-2 w-5 h-5" />
                                Create Referral Code
                            </button>
                        </div>
                    </div>

                   
                    <div>
                        <div className="flex items-center mb-4">
                            <Users className="w-6 h-6 mr-3 text-blue-500 dark:text-blue-400" />
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                                Referral Codes Performance
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {referralData.referralCodes.map((refCode) => (
                                <div 
                                    key={refCode.id} 
                                    className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <QrCode className="w-5 h-5 mr-2 text-green-500" />
                                            <span className="font-bold text-gray-700 dark:text-white">
                                                {refCode.code}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => handleCopyReferralCode(refCode.code)}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        {refCode.influencerName && (
                                            <p className="text-sm">
                                                <Users className="inline-block w-4 h-4 mr-1 text-gray-500" />
                                                Influencer: {refCode.influencerName}
                                            </p>
                                        )}
                                        <p className="text-sm">
                                            <Percent className="inline-block w-4 h-4 mr-1 text-blue-500" />
                                            Used: {refCode.usedCount} times
                                        </p>
                                        <p className="text-sm">
                                            <Gift className="inline-block w-4 h-4 mr-1 text-green-500" />
                                            Credit Earned: ${refCode.creditEarned}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Gift className="w-6 h-6 text-green-500 dark:text-green-300" />
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-white">
                                    Total Referral Credits
                                </h3>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                                    ${referralData.totalReferralCredits}
                                </p>
                            </div>
                        </div>
                        <button 
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                            Redeem Credits
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralTracking;